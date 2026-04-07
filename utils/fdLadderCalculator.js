import { FD_TENURE_OPTIONS } from '@/constants/fdLadderConfig'

function calculateMaturity(principal, annualRate, months) {
  return principal * (1 + (annualRate / 100) * (months / 12))
}

export function calculateFDLadder({
  totalInvestment,
  monthlyExpenses,
  targetRunwayMonths,
  rates,
}) {
  const total = Number(totalInvestment) || 0
  const monthly = Number(monthlyExpenses) || 0
  const runwayMonths = Number(targetRunwayMonths) || 6

  const requiredCorpus = monthly * runwayMonths
  const corpusGap = Math.max(0, requiredCorpus - total)

  const activeTenures = FD_TENURE_OPTIONS
    .map(t => t.months)
    .filter(months => months <= runwayMonths)

  const ladder = []
  let previousMonths = 0
  let allocated = 0

  // Allocate liquidity coverage across each rung block.
  activeTenures.forEach((tenure, index) => {
    const blockMonths = tenure - previousMonths
    const idealBlockAmount = monthly * blockMonths
    const remainingForCoverage = Math.max(0, Math.min(total, requiredCorpus) - allocated)
    const amount = index === activeTenures.length - 1
      ? remainingForCoverage
      : Math.min(idealBlockAmount, remainingForCoverage)

    const rate = Number(rates[String(tenure)]) || 0
    const maturityAmount = calculateMaturity(amount, rate, tenure)

    ladder.push({
      tenureMonths: tenure,
      amount: Math.round(amount),
      rate,
      maturityAmount: Math.round(maturityAmount),
      blockMonths,
    })

    allocated += amount
    previousMonths = tenure
  })

  // Any surplus goes to longest tenure for better return.
  const surplus = Math.max(0, total - allocated)
  if (surplus > 0) {
    const longTenure = 12
    const rate = Number(rates[String(longTenure)]) || 0
    const maturityAmount = calculateMaturity(surplus, rate, longTenure)
    ladder.push({
      tenureMonths: longTenure,
      amount: Math.round(surplus),
      rate,
      maturityAmount: Math.round(maturityAmount),
      blockMonths: 0,
      isSurplusBucket: true,
    })
  }

  const totalMaturity = ladder.reduce((sum, rung) => sum + rung.maturityAmount, 0)
  const weightedRate = total > 0
    ? ladder.reduce((sum, rung) => sum + (rung.rate * rung.amount), 0) / total
    : 0

  const instantLiquiditySuggestion = monthly
  const noBreakRunwayMonths = Math.min(runwayMonths, Math.floor(total / monthly))

  return {
    requiredCorpus: Math.round(requiredCorpus),
    corpusGap: Math.round(corpusGap),
    totalAllocated: Math.round(total),
    totalMaturity: Math.round(totalMaturity),
    weightedRate: Number(weightedRate.toFixed(2)),
    noBreakRunwayMonths,
    instantLiquiditySuggestion: Math.round(instantLiquiditySuggestion),
    ladder,
    runwayMonths,
  }
}
