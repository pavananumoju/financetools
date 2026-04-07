export const EMERGENCY_FUND_DEFAULTS = {
  oneTimeInflow: 0,
  lifestyleExpenses: '',
}

export const DEPENDENT_OPTIONS = [
  { value: 'no', label: 'No dependents', score: 0 },
  { value: 'yes', label: 'Yes, I support dependents', score: 2 },
]

export const HOUSEHOLD_INCOME_OPTIONS = [
  { value: 'dual', label: 'Dual income household', score: 0 },
  { value: 'single', label: 'Single income household', score: 1 },
]

export const EMI_BURDEN_OPTIONS = [
  { value: 'low', label: 'Low (<20% of income)', score: 0 },
  { value: 'medium', label: 'Medium (20-40% of income)', score: 1 },
  { value: 'high', label: 'High (>40% of income)', score: 2 },
]

export const MARKET_CONFIDENCE_OPTIONS = [
  { value: 'high', label: 'High (easy to find offers)', score: 0 },
  { value: 'medium', label: 'Medium (may take some time)', score: 1 },
  { value: 'low', label: 'Low (hiring is weak)', score: 2 },
]

export const RUNWAY_CONFIG = {
  baseMonths: 6,
  minMonths: 4,
  maxMonths: 12,
}
