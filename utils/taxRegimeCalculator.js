import {
  NEW_REGIME_SLABS,
  OLD_REGIME_SLABS,
  NEW_REGIME_STANDARD_DEDUCTION,
  OLD_REGIME_STANDARD_DEDUCTION,
  CESS_RATE,
  NEW_REGIME_REBATE_LIMIT,
  NEW_REGIME_REBATE_MAX,
  OLD_REGIME_REBATE_LIMIT,
  OLD_REGIME_REBATE_MAX,
  SECTION_80C_LIMIT,
  SECTION_80D_LIMIT_SELF,
  SECTION_80D_LIMIT_PARENTS,
} from '@/constants/taxConfig'

function calculateSlabTax(income, slabs) {
  let tax = 0
  const breakdown = []
  for (const slab of slabs) {
    if (income <= slab.min) break
    const taxableInSlab = Math.min(income, slab.max) - slab.min
    const taxInSlab = Math.round(taxableInSlab * slab.rate)
    tax += taxInSlab
    if (slab.rate > 0) {
      const maxLabel = slab.max === Infinity ? 'above' : `₹${(slab.max / 100000).toFixed(0)}L`
      breakdown.push({
        label: `₹${(slab.min / 100000).toFixed(0)}L – ${maxLabel}`,
        rate: `${slab.rate * 100}%`,
        taxableAmount: taxableInSlab,
        tax: taxInSlab,
      })
    }
  }
  return { tax: Math.round(tax), breakdown }
}

function applyRebate(tax, taxableIncome, rebateLimit, rebateMax) {
  if (taxableIncome <= rebateLimit) {
    return Math.max(0, tax - Math.min(tax, rebateMax))
  }
  return tax
}

function calculateHRAExemption({ basicSalary, hraReceived, rentPaid, isMetro }) {
  if (!basicSalary || !hraReceived || !rentPaid) return 0
  const basic = Number(basicSalary)
  const hra = Number(hraReceived)
  const rent = Number(rentPaid)
  if (rent === 0) return 0
  const rentMinusPercent = rent - 0.1 * basic
  const percentOfBasic = isMetro ? 0.5 * basic : 0.4 * basic
  return Math.round(Math.max(0, Math.min(hra, rentMinusPercent, percentOfBasic)))
}

function calculate80C(items80c) {
  const total = Object.values(items80c).reduce((sum, v) => sum + (Number(v) || 0), 0)
  return Math.min(total, SECTION_80C_LIMIT)
}

function calculate80D(items80d) {
  const selfFamily = Math.min(Number(items80d['80d_self_family']) || 0, SECTION_80D_LIMIT_SELF)
  const parents = Math.min(Number(items80d['80d_parents']) || 0, SECTION_80D_LIMIT_PARENTS)
  const preventive = Math.min(Number(items80d['80d_preventive']) || 0, 5000)
  return selfFamily + parents + preventive
}

export function calculateTaxRegimes({
  grossSalary,
  basicSalary,
  hraReceived,
  rentPaid,
  isMetro,
  items80c,
  items80d,
  npsAmount,
  homeLoanInterest,
  toggles,
}) {
  const salary = Number(grossSalary) || 0

  // --- NEW REGIME ---
  const newTaxableIncome = Math.max(0, salary - NEW_REGIME_STANDARD_DEDUCTION)
  const { tax: newTaxOnSlabs, breakdown: newSlabBreakdown } = calculateSlabTax(newTaxableIncome, NEW_REGIME_SLABS)
  const newTaxAfterRebate = applyRebate(newTaxOnSlabs, newTaxableIncome, NEW_REGIME_REBATE_LIMIT, NEW_REGIME_REBATE_MAX)
  const newCess = Math.round(newTaxAfterRebate * CESS_RATE)
  const newTotalTax = newTaxAfterRebate + newCess

  // --- OLD REGIME ---
  const hraExemption = toggles.hra
    ? calculateHRAExemption({ basicSalary, hraReceived, rentPaid, isMetro })
    : 0
  const deduction80c = toggles.section80c ? calculate80C(items80c) : 0
  const deduction80d = toggles.section80d ? calculate80D(items80d) : 0
  const deductionNPS = toggles.nps ? Math.min(Number(npsAmount) || 0, 50000) : 0
  const deductionHomeLoan = toggles.homeLoan ? Math.min(Number(homeLoanInterest) || 0, 200000) : 0
  const deduction80TTA = 10000

  const deductionBreakdown = [
    { label: 'Standard Deduction', amount: OLD_REGIME_STANDARD_DEDUCTION },
    ...(hraExemption > 0 ? [{ label: 'HRA Exemption', amount: hraExemption }] : []),
    ...(deduction80c > 0 ? [{ label: '80C Investments', amount: deduction80c }] : []),
    ...(deduction80d > 0 ? [{ label: '80D Health Insurance', amount: deduction80d }] : []),
    ...(deductionNPS > 0 ? [{ label: 'NPS (80CCD1B)', amount: deductionNPS }] : []),
    ...(deductionHomeLoan > 0 ? [{ label: 'Home Loan Interest 24(b)', amount: deductionHomeLoan }] : []),
    { label: 'Savings Interest (80TTA)', amount: deduction80TTA },
  ]

  const totalOldDeductions = deductionBreakdown.reduce((sum, d) => sum + d.amount, 0)
  const oldTaxableIncome = Math.max(0, salary - totalOldDeductions)
  const { tax: oldTaxOnSlabs, breakdown: oldSlabBreakdown } = calculateSlabTax(oldTaxableIncome, OLD_REGIME_SLABS)
  const oldTaxAfterRebate = applyRebate(oldTaxOnSlabs, oldTaxableIncome, OLD_REGIME_REBATE_LIMIT, OLD_REGIME_REBATE_MAX)
  const oldCess = Math.round(oldTaxAfterRebate * CESS_RATE)
  const oldTotalTax = oldTaxAfterRebate + oldCess

  // --- COMPARISON ---
  const taxDifference = oldTotalTax - newTotalTax
  const betterRegime = taxDifference > 0 ? 'new' : taxDifference < 0 ? 'old' : 'equal'
  const savings = Math.abs(taxDifference)
  const monthlySavings = Math.round(savings / 12)

  // --- UNUSED HINTS ---
  const unusedHints = []
  if (toggles.section80c) {
    const used80c = Object.values(items80c).reduce((s, v) => s + (Number(v) || 0), 0)
    const unused = SECTION_80C_LIMIT - Math.min(used80c, SECTION_80C_LIMIT)
    if (unused > 0) unusedHints.push(`₹${unused.toLocaleString('en-IN')} of your 80C limit is unused`)
  }
  if (toggles.nps && (Number(npsAmount) || 0) === 0) {
    unusedHints.push('NPS 80CCD(1B) not used — up to ₹50,000 additional deduction available')
  }

  return {
    grossSalary: salary,
    newRegime: {
      standardDeduction: NEW_REGIME_STANDARD_DEDUCTION,
      taxableIncome: newTaxableIncome,
      taxOnSlabs: newTaxAfterRebate,
      slabBreakdown: newSlabBreakdown,
      cess: newCess,
      totalTax: newTotalTax,
    },
    oldRegime: {
      deductionBreakdown,
      totalDeductions: totalOldDeductions,
      taxableIncome: oldTaxableIncome,
      taxOnSlabs: oldTaxAfterRebate,
      slabBreakdown: oldSlabBreakdown,
      cess: oldCess,
      totalTax: oldTotalTax,
    },
    betterRegime,
    savings,
    monthlySavings,
    unusedHints,
  }
}