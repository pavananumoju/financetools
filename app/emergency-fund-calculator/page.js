'use client'

import { useState } from 'react'
import CalculatorInput from '@/components/ui/CalculatorInput'
import {
  DEPENDENT_OPTIONS,
  HOUSEHOLD_INCOME_OPTIONS,
  EMI_BURDEN_OPTIONS,
  MARKET_CONFIDENCE_OPTIONS,
} from '@/constants/emergencyFundConfig'
import { calculateEmergencyFundRunway } from '@/utils/emergencyFundCalculator'

export default function EmergencyFundCalculatorPage() {
  const [essentialExpenses, setEssentialExpenses] = useState('')
  const [liquidSavings, setLiquidSavings] = useState('')
  const [monthlySavingsCapacity, setMonthlySavingsCapacity] = useState('')
  const [oneTimeInflow, setOneTimeInflow] = useState('')
  const [lifestyleExpenses, setLifestyleExpenses] = useState('')

  const [dependents, setDependents] = useState('no')
  const [householdIncomeType, setHouseholdIncomeType] = useState('dual')
  const [emiBurden, setEmiBurden] = useState('low')
  const [marketConfidence, setMarketConfidence] = useState('medium')

  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const preventNumberScroll = (event) => event.currentTarget.blur()

  const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'

  function fmt(amount) {
    return Math.abs(amount).toLocaleString('en-IN')
  }

  function formatMonthYear(date) {
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  }

  function handleCalculate() {
    setError('')
    setResults(null)

    if (!essentialExpenses || Number(essentialExpenses) <= 0) {
      setError('Please enter your monthly essential expenses.')
      return
    }
    if (!liquidSavings || Number(liquidSavings) < 0) {
      setError('Please enter your current liquid savings.')
      return
    }
    if (!monthlySavingsCapacity || Number(monthlySavingsCapacity) < 0) {
      setError('Please enter your monthly savings capacity.')
      return
    }
    if (Number(essentialExpenses) > 10000000) {
      setError('Essential expenses look unusually high. Please double check.')
      return
    }
    if (Number(liquidSavings) > 1000000000) {
      setError('Savings value looks unusually high. Please double check.')
      return
    }
    if (Number(monthlySavingsCapacity) > 100000000) {
      setError('Monthly savings capacity looks unusually high. Please double check.')
      return
    }
    if (oneTimeInflow && Number(oneTimeInflow) < 0) {
      setError('Expected one-time inflow cannot be negative.')
      return
    }
    if (lifestyleExpenses && Number(lifestyleExpenses) <= 0) {
      setError('Lifestyle expenses must be greater than zero if provided.')
      return
    }

    const result = calculateEmergencyFundRunway({
      essentialExpenses,
      liquidSavings,
      monthlySavingsCapacity,
      oneTimeInflow,
      lifestyleExpenses,
      dependents,
      householdIncomeType,
      emiBurden,
      marketConfidence,
    })
    setResults(result)
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">Tool 1.3</p>
          <h1 className="text-3xl font-bold text-slate-900">Emergency Fund Runway Planner</h1>
          <p className="mt-2 text-slate-500">
            Find your earliest safe job-switch date based on your expenses, risk profile, and current cash runway.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Financial Inputs</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CalculatorInput label="Monthly Essential Expenses" hint="Rent/EMI, groceries, utilities, insurance, basic transport">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 60000" value={essentialExpenses} onChange={(e) => setEssentialExpenses(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
            <CalculatorInput label="Current Liquid Savings" hint="Cash + savings account + liquid mutual funds only">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 300000" value={liquidSavings} onChange={(e) => setLiquidSavings(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
            <CalculatorInput label="Monthly Savings Capacity" hint="How much you can add monthly before switching">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 40000" value={monthlySavingsCapacity} onChange={(e) => setMonthlySavingsCapacity(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
            <CalculatorInput label="Expected One-time Inflow (Optional)" hint="Bonus, severance, or arrears before switch">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 100000" value={oneTimeInflow} onChange={(e) => setOneTimeInflow(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
            <div className="md:col-span-2">
              <CalculatorInput label="Current Monthly Lifestyle Expenses (Optional)" hint="Include monthly non-essential spends to compare lifestyle runway vs essential runway">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                  <input type="number" placeholder="e.g. 90000" value={lifestyleExpenses} onChange={(e) => setLifestyleExpenses(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
                </div>
              </CalculatorInput>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Risk Profile</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CalculatorInput label="Dependents">
              <select value={dependents} onChange={(e) => setDependents(e.target.value)} className={inputClass}>
                {DEPENDENT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </CalculatorInput>
            <CalculatorInput label="Household Income Type">
              <select value={householdIncomeType} onChange={(e) => setHouseholdIncomeType(e.target.value)} className={inputClass}>
                {HOUSEHOLD_INCOME_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </CalculatorInput>
            <CalculatorInput label="EMI Burden">
              <select value={emiBurden} onChange={(e) => setEmiBurden(e.target.value)} className={inputClass}>
                {EMI_BURDEN_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </CalculatorInput>
            <CalculatorInput label="Current Job Market Confidence">
              <select value={marketConfidence} onChange={(e) => setMarketConfidence(e.target.value)} className={inputClass}>
                {MARKET_CONFIDENCE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </CalculatorInput>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors mb-8"
        >
          Calculate Safe Switch Date
        </button>

        {results && (
          <div className="flex flex-col gap-4">
            <div className={`rounded-2xl p-6 ${results.readyNow ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
              <p className="text-sm font-medium text-white/80 mb-1">Switch readiness status</p>
              <p className="text-2xl font-black text-white mb-1">
                {results.readyNow ? 'Ready to switch now' : 'Not ready yet'}
              </p>
              <p className="text-sm text-white/90">
                Earliest safe switch month:{' '}
                <span className="font-bold text-white">
                  {results.safeSwitchDate ? formatMonthYear(results.safeSwitchDate) : 'Not calculable yet'}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Your runway today</p>
                <p className="text-2xl font-black text-slate-900">{results.currentRunwayMonths} months</p>
                {results.lifestyleRunwayMonths !== null && (
                  <p className="text-xs text-slate-500 mt-2">At current lifestyle spend: {results.lifestyleRunwayMonths} months</p>
                )}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Recommended runway for your profile</p>
                <p className="text-2xl font-black text-slate-900">{results.targetMonths} months</p>
                <p className="text-xs text-slate-500 mt-2">Risk score used: {results.riskScore}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Emergency fund target</p>
                <p className="text-2xl font-black text-slate-900">₹{fmt(results.requiredCorpus)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">You still need</p>
                <p className={`text-2xl font-black ${results.shortfall > 0 ? 'text-indigo-600' : 'text-emerald-600'}`}>
                  ₹{fmt(results.shortfall)}
                </p>
                <p className="text-xs text-slate-500 mt-2">Current corpus: ₹{fmt(results.currentCorpus)}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <p className="text-sm font-semibold text-indigo-900 mb-2">What this means for your switch plan</p>
              <p className="text-sm text-indigo-800 leading-relaxed">
                Your profile ({results.profileLabels.dependents}, {results.profileLabels.householdIncomeType}, {results.profileLabels.emiBurden}, {results.profileLabels.marketConfidence}) suggests a target runway of {results.targetMonths} months.{' '}
                {results.readyNow
                  ? `You already meet this target with ₹${fmt(results.currentCorpus)} in liquid funds, so your switch is financially safer.`
                  : results.monthsToReady === null
                  ? `You still need ₹${fmt(results.shortfall)}. Since monthly savings capacity is zero, this target is not reachable until you increase savings or add one-time inflow.`
                  : `You are short by ₹${fmt(results.shortfall)}. At ₹${fmt(monthlySavingsCapacity || 0)}/month savings, you can likely reach this target in ${results.monthsToReady} month${results.monthsToReady > 1 ? 's' : ''}.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
