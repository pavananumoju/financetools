'use client'

import { useState } from 'react'
import CalculatorInput from '@/components/ui/CalculatorInput'
import {
  HORIZON_OPTIONS,
  PAYOUT_CONFIDENCE_OPTIONS,
} from '@/constants/jobOfferConfig'
import { calculateJobOfferTrueValue } from '@/utils/jobOfferCalculator'

export default function JobOfferTrueValueCalculatorPage() {
  const [currentMonthlyInHand, setCurrentMonthlyInHand] = useState('')
  const [currentAnnualFixedPay, setCurrentAnnualFixedPay] = useState('')
  const [offeredFixedAnnual, setOfferedFixedAnnual] = useState('')
  const [variableAnnualTarget, setVariableAnnualTarget] = useState('')
  const [variablePayoutConfidence, setVariablePayoutConfidence] = useState('80')
  const [joiningBonus, setJoiningBonus] = useState('')
  const [retentionOrRelocationBonus, setRetentionOrRelocationBonus] = useState('')
  const [annualBenefitsValue, setAnnualBenefitsValue] = useState('')
  const [oneTimeHorizonMonths, setOneTimeHorizonMonths] = useState('12')

  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
  const preventNumberScroll = (event) => event.currentTarget.blur()

  function fmt(amount) {
    return Math.abs(amount).toLocaleString('en-IN')
  }

  function handleCalculate() {
    setError('')
    setResults(null)

    if (!currentMonthlyInHand || Number(currentMonthlyInHand) <= 0) {
      setError('Please enter your current monthly in-hand salary.')
      return
    }
    if (!offeredFixedAnnual || Number(offeredFixedAnnual) <= 0) {
      setError('Please enter offered fixed annual pay.')
      return
    }
    if (!currentAnnualFixedPay || Number(currentAnnualFixedPay) <= 0) {
      setError('Please enter your current annual fixed pay to estimate in-hand accurately.')
      return
    }
    if (variableAnnualTarget && Number(variableAnnualTarget) < 0) {
      setError('Variable pay target cannot be negative.')
      return
    }
    if (joiningBonus && Number(joiningBonus) < 0) {
      setError('Joining bonus cannot be negative.')
      return
    }
    if (retentionOrRelocationBonus && Number(retentionOrRelocationBonus) < 0) {
      setError('Retention/relocation bonus cannot be negative.')
      return
    }
    if (annualBenefitsValue && Number(annualBenefitsValue) < 0) {
      setError('Benefits value cannot be negative.')
      return
    }

    const result = calculateJobOfferTrueValue({
      currentMonthlyInHand,
      currentAnnualFixedPay,
      offeredFixedAnnual,
      variableAnnualTarget,
      variablePayoutConfidence,
      joiningBonus,
      retentionOrRelocationBonus,
      annualBenefitsValue,
      oneTimeHorizonMonths,
    })
    setResults(result)
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">Tool 1.4</p>
          <h1 className="text-3xl font-bold text-slate-900">Job Offer True Value Calculator</h1>
          <p className="mt-2 text-slate-500">
            Break your offer into guaranteed monthly value, variable risk, and one-time components.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Your Current Baseline</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CalculatorInput label="Current Monthly In-hand Salary" hint="Take-home amount credited every month">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 156000" value={currentMonthlyInHand} onChange={(e) => setCurrentMonthlyInHand(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
            <CalculatorInput label="Current Annual Fixed / CTC" hint="Used to estimate your current take-home ratio (tax + PF + deductions)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 2500000" value={currentAnnualFixedPay} onChange={(e) => setCurrentAnnualFixedPay(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Offered Compensation</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CalculatorInput label="Offered Fixed Annual Pay" hint="Guaranteed fixed annual amount (not CTC headline)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 2400000" value={offeredFixedAnnual} onChange={(e) => setOfferedFixedAnnual(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>

            <CalculatorInput label="Variable Pay Target (Annual)" hint="Set 0 if there is no variable pay">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 400000" value={variableAnnualTarget} onChange={(e) => setVariableAnnualTarget(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>

            <CalculatorInput label="Expected Variable Payout Confidence">
              <select value={variablePayoutConfidence} onChange={(e) => setVariablePayoutConfidence(e.target.value)} className={inputClass}>
                {PAYOUT_CONFIDENCE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </CalculatorInput>

            <CalculatorInput label="Annual Benefits Value (Optional)" hint="Insurance top-up, meal card, reimbursements, etc.">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 120000" value={annualBenefitsValue} onChange={(e) => setAnnualBenefitsValue(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">One-time Components</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CalculatorInput label="Joining Bonus (One-time)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 300000" value={joiningBonus} onChange={(e) => setJoiningBonus(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>

            <CalculatorInput label="Retention/Relocation Bonus (One-time)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 200000" value={retentionOrRelocationBonus} onChange={(e) => setRetentionOrRelocationBonus(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>

            <div className="md:col-span-2">
              <CalculatorInput label="Spread one-time components over">
                <select value={oneTimeHorizonMonths} onChange={(e) => setOneTimeHorizonMonths(e.target.value)} className={inputClass}>
                  {HORIZON_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </CalculatorInput>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button onClick={handleCalculate} className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors mb-8">
          Calculate True Offer Value
        </button>

        {results && (
          <div className="flex flex-col gap-4">
            <div className={`rounded-2xl p-6 ${results.isGuaranteedDrop ? 'bg-red-600' : 'bg-emerald-600'}`}>
              <p className="text-sm font-medium text-white/80 mb-1">Guaranteed monthly change</p>
              <p className="text-3xl font-black text-white mb-1">
                {results.isGuaranteedDrop ? '−' : '+'}₹{fmt(results.guaranteedMonthlyGain)}
              </p>
                <p className="text-sm text-white/90">
                Estimated in-hand monthly from fixed pay: ₹{fmt(results.guaranteedMonthly)}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Realistic monthly value</p>
                <p className="text-2xl font-black text-slate-900">₹{fmt(results.trueMonthlyValue)}</p>
                <p className="text-xs text-slate-500 mt-2">
                  Including expected variable + prorated one-time + benefits
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Realistic monthly gain vs current</p>
                <p className={`text-2xl font-black ${results.isRealisticDrop ? 'text-red-600' : 'text-indigo-600'}`}>
                  {results.isRealisticDrop ? '−' : '+'}₹{fmt(results.realisticMonthlyGain)}
                </p>
                <p className="text-xs text-slate-500 mt-2">Current baseline: ₹{fmt(results.currentMonthlyInHand)}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900 mb-3">Offer component breakdown (monthly equivalent)</p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Guaranteed fixed pay (estimated in-hand)</span>
                  <span className="font-semibold text-slate-900">₹{fmt(results.guaranteedMonthly)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Expected variable in-hand ({results.payoutConfidencePercent}% confidence)</span>
                  <span className="font-semibold text-slate-900">₹{fmt(results.expectedVariableMonthly)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>One-time components in-hand spread over {results.horizonMonths} months</span>
                  <span className="font-semibold text-slate-900">₹{fmt(results.oneTimeMonthlyEquivalent)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Benefits monthly equivalent</span>
                  <span className="font-semibold text-slate-900">₹{fmt(results.benefitsMonthly)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <p className="text-sm font-semibold text-indigo-900 mb-2">Reality check</p>
              <p className="text-sm text-indigo-800 leading-relaxed">
                Your headline annual offer is ₹{fmt(results.headlineAnnualOffer)}, but estimated monthly in-hand is based on your current effective take-home ratio ({results.takeHomeRatioPercent}%).
                This gives a more realistic monthly comparison than raw CTC math.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
