import {
  DEPENDENT_OPTIONS,
  HOUSEHOLD_INCOME_OPTIONS,
  EMI_BURDEN_OPTIONS,
  MARKET_CONFIDENCE_OPTIONS,
  RUNWAY_CONFIG,
} from '@/constants/emergencyFundConfig'

function getOptionScore(options, value) {
  const match = options.find(option => option.value === value)
  return match ? match.score : 0
}

function getOptionLabel(options, value, fallback) {
  const match = options.find(option => option.value === value)
  return match ? match.label : fallback
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function addMonths(date, monthsToAdd) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + monthsToAdd)
  return d
}

export function calculateEmergencyFundRunway({
  essentialExpenses,
  liquidSavings,
  monthlySavingsCapacity,
  dependents,
  householdIncomeType,
  emiBurden,
  marketConfidence,
  oneTimeInflow,
  lifestyleExpenses,
}) {
  const essential = Number(essentialExpenses) || 0
  const liquid = Number(liquidSavings) || 0
  const monthlySave = Number(monthlySavingsCapacity) || 0
  const inflow = Number(oneTimeInflow) || 0
  const lifestyle = Number(lifestyleExpenses) || 0

  const riskScore =
    getOptionScore(DEPENDENT_OPTIONS, dependents) +
    getOptionScore(HOUSEHOLD_INCOME_OPTIONS, householdIncomeType) +
    getOptionScore(EMI_BURDEN_OPTIONS, emiBurden) +
    getOptionScore(MARKET_CONFIDENCE_OPTIONS, marketConfidence)

  const targetMonths = clamp(
    RUNWAY_CONFIG.baseMonths + riskScore,
    RUNWAY_CONFIG.minMonths,
    RUNWAY_CONFIG.maxMonths
  )

  const currentCorpus = liquid + inflow
  const requiredCorpus = essential * targetMonths
  const shortfall = Math.max(0, requiredCorpus - currentCorpus)
  const currentRunwayMonths = currentCorpus / essential
  const readyNow = shortfall === 0

  const monthsToReady = readyNow
    ? 0
    : monthlySave > 0
    ? Math.ceil(shortfall / monthlySave)
    : null

  const safeSwitchDate = monthsToReady === null
    ? null
    : addMonths(new Date(), monthsToReady)

  const lifestyleRunwayMonths = lifestyle > 0 ? currentCorpus / lifestyle : null

  return {
    riskScore,
    targetMonths,
    currentCorpus: Math.round(currentCorpus),
    requiredCorpus: Math.round(requiredCorpus),
    shortfall: Math.round(shortfall),
    currentRunwayMonths: Number(currentRunwayMonths.toFixed(1)),
    lifestyleRunwayMonths:
      lifestyleRunwayMonths === null ? null : Number(lifestyleRunwayMonths.toFixed(1)),
    readyNow,
    monthsToReady,
    safeSwitchDate,
    profileLabels: {
      dependents: getOptionLabel(DEPENDENT_OPTIONS, dependents, 'No dependents'),
      householdIncomeType: getOptionLabel(HOUSEHOLD_INCOME_OPTIONS, householdIncomeType, 'Dual income household'),
      emiBurden: getOptionLabel(EMI_BURDEN_OPTIONS, emiBurden, 'Low EMI burden'),
      marketConfidence: getOptionLabel(MARKET_CONFIDENCE_OPTIONS, marketConfidence, 'High market confidence'),
    },
  }
}
