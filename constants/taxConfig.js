export const TAX_YEAR = 'FY 2025-26 (AY 2026-27)'

export const NEW_REGIME_SLABS = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 0.05 },
  { min: 800000, max: 1200000, rate: 0.10 },
  { min: 1200000, max: 1600000, rate: 0.15 },
  { min: 1600000, max: 2000000, rate: 0.20 },
  { min: 2000000, max: 2400000, rate: 0.25 },
  { min: 2400000, max: Infinity, rate: 0.30 },
]

export const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 0.05 },
  { min: 500000, max: 1000000, rate: 0.20 },
  { min: 1000000, max: Infinity, rate: 0.30 },
]

export const NEW_REGIME_STANDARD_DEDUCTION = 75000
export const OLD_REGIME_STANDARD_DEDUCTION = 50000
export const CESS_RATE = 0.04

export const NEW_REGIME_REBATE_LIMIT = 1200000
export const NEW_REGIME_REBATE_MAX = 60000
export const OLD_REGIME_REBATE_LIMIT = 500000
export const OLD_REGIME_REBATE_MAX = 12500

// 80C individual items
// To add a new item: add entry here. UI updates automatically.
export const SECTION_80C_ITEMS = [
  {
    id: '80c_epf',
    label: 'EPF (Employee Provident Fund)',
    hint: 'Check your monthly payslip — look for PF deduction and multiply by 12',
  },
  {
    id: '80c_ppf',
    label: 'PPF Contribution',
    hint: 'Check your PPF passbook or bank statement for this financial year',
  },
  {
    id: '80c_elss',
    label: 'ELSS Mutual Funds',
    hint: 'Total amount invested in tax-saving mutual funds this year',
  },
  {
    id: '80c_lic',
    label: 'LIC / Life Insurance Premium',
    hint: 'Annual premium paid for life insurance policies',
  },
  {
    id: '80c_nsc',
    label: 'NSC (National Savings Certificate)',
    hint: 'Amount invested in NSC this year',
  },
  {
    id: '80c_tuition',
    label: 'Children Tuition Fees',
    hint: 'School tuition fees paid for up to 2 children (not hostel or transport)',
  },
  {
    id: '80c_homeloan_principal',
    label: 'Home Loan Principal Repayment',
    hint: 'Principal portion of your home loan EMI — check your loan statement',
  },
  {
    id: '80c_other',
    label: 'Other 80C Investments',
    hint: 'Tax-saving FDs, ULIP, Sukanya Samriddhi etc.',
  },
]
export const SECTION_80C_LIMIT = 150000

// 80D items
export const SECTION_80D_ITEMS = [
  {
    id: '80d_self_family',
    label: 'Health Insurance — Self & Family',
    hint: 'Annual premium for your own and your spouse/children health insurance',
    maxLimit: 25000,
  },
  {
    id: '80d_parents',
    label: 'Health Insurance — Parents',
    hint: 'Annual premium for parents health insurance (higher limit if parents are senior citizens)',
    maxLimit: 50000,
  },
  {
    id: '80d_preventive',
    label: 'Preventive Health Checkup',
    hint: 'Annual health checkup expenses for self and family — max ₹5,000 within overall 80D limit',
    maxLimit: 5000,
  },
]
export const SECTION_80D_LIMIT_SELF = 25000
export const SECTION_80D_LIMIT_PARENTS = 50000

// HRA formula inputs
export const HRA_METRO_CITIES = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai']