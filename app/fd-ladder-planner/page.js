'use client'

import { useState } from 'react'
import CalculatorInput from '@/components/ui/CalculatorInput'
import { DEFAULT_FD_RATES, RUNWAY_OPTIONS } from '@/constants/fdLadderConfig'
import { calculateFDLadder } from '@/utils/fdLadderCalculator'

export default function FDLadderPlannerPage() {
  const [totalInvestment, setTotalInvestment] = useState('')
  const [monthlyExpenses, setMonthlyExpenses] = useState('')
  const [targetRunwayMonths, setTargetRunwayMonths] = useState('6')
  const [rates, setRates] = useState({
    3: String(DEFAULT_FD_RATES[3]),
    6: String(DEFAULT_FD_RATES[6]),
    9: String(DEFAULT_FD_RATES[9]),
    12: String(DEFAULT_FD_RATES[12]),
  })
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
  const preventNumberScroll = (event) => event.currentTarget.blur()

  function fmt(amount) {
    return Math.abs(amount).toLocaleString('en-IN')
  }

  function handleRateChange(tenure, value) {
    setRates(prev => ({ ...prev, [tenure]: value }))
  }

  function handleCalculate() {
    setError('')
    setResults(null)

    if (!totalInvestment || Number(totalInvestment) <= 0) {
      setError('Please enter total amount to allocate in FD ladder.')
      return
    }
    if (!monthlyExpenses || Number(monthlyExpenses) <= 0) {
      setError('Please enter monthly essential expenses.')
      return
    }
    if (Number(totalInvestment) > 1000000000) {
      setError('Investment amount looks unusually high. Please double check.')
      return
    }
    if (Number(monthlyExpenses) > 10000000) {
      setError('Monthly expense looks unusually high. Please double check.')
      return
    }

    const parsedRates = {
      3: Number(rates[3]) || 0,
      6: Number(rates[6]) || 0,
      9: Number(rates[9]) || 0,
      12: Number(rates[12]) || 0,
    }

    if (Object.values(parsedRates).some(rate => rate < 0 || rate > 20)) {
      setError('FD rates should be between 0% and 20%.')
      return
    }

    const result = calculateFDLadder({
      totalInvestment,
      monthlyExpenses,
      targetRunwayMonths,
      rates: parsedRates,
    })
    setResults(result)
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">Tool 2.1</p>
          <h1 className="text-3xl font-bold text-slate-900">FD Ladder Planner</h1>
          <p className="mt-2 text-slate-500">
            Split your FD corpus across staggered maturities to balance liquidity access and returns.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Planner Inputs</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CalculatorInput label="Total amount to put in FDs" hint="Money you want split across the ladder (not cash you keep in savings for instant use).">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 900000" value={totalInvestment} onChange={(e) => setTotalInvestment(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
            <CalculatorInput label="Monthly essential expenses" hint="Must-pay monthly burn (rent, food, utilities, core EMIs) — used to size each ladder rung.">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input type="number" placeholder="e.g. 75000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pl-7`} />
              </div>
            </CalculatorInput>
            <div className="md:col-span-2">
              <CalculatorInput
                label="How many months should this FD pool cover?"
                hint="Pick how long you want staggered FD maturities to replace drawing from salary or breaking FDs early. Required corpus = monthly essentials × months."
              >
                <select value={targetRunwayMonths} onChange={(e) => setTargetRunwayMonths(e.target.value)} className={inputClass}>
                  {RUNWAY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </CalculatorInput>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-1">FD rates (annual %)</h2>
          <p className="text-xs text-slate-500 mb-5">Sample defaults only — not live bank rates. Enter what your bank offers today for each tenure.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[3, 6, 9, 12].map(tenure => (
              <CalculatorInput key={tenure} label={`${tenure}M FD`}>
                <div className="relative">
                  <input type="number" placeholder="7.0" value={rates[tenure]} onChange={(e) => handleRateChange(tenure, e.target.value)} onWheel={preventNumberScroll} className={`${inputClass} pr-8`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </CalculatorInput>
            ))}
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
          Plan FD Ladder
        </button>

        {results && (
          <div className="flex flex-col gap-4">
            <div className={`rounded-2xl p-6 ${results.corpusGap > 0 ? 'bg-amber-600' : 'bg-emerald-600'}`}>
              <p className="text-sm font-medium text-white/80 mb-1">Unique insight: no-break runway coverage</p>
              <p className="text-3xl font-black text-white mb-1">{results.noBreakRunwayMonths} months</p>
              <p className="text-sm text-white/90">
                Your ladder can cover up to {results.noBreakRunwayMonths} months of essential expenses without premature FD breakage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Required corpus ({results.runwayMonths} months of essentials)</p>
                <p className="text-2xl font-black text-slate-900">₹{fmt(results.requiredCorpus)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Shortfall vs that required corpus</p>
                <p className={`text-2xl font-black ${results.corpusGap > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  ₹{fmt(results.corpusGap)}
                </p>
                <p className="text-xs text-slate-400 mt-2">₹0 means your FD total already meets or exceeds the amount needed for the months you selected.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Weighted average interest rate</p>
                <p className="text-2xl font-black text-slate-900">{results.weightedRate}%</p>
                <p className="text-xs text-slate-400 mt-2">Weighted average interest rate across all FD buckets after split.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-500 mb-1">Combined maturity value (all rungs)</p>
                <p className="text-2xl font-black text-slate-900">₹{fmt(results.totalMaturity)}</p>
                <p className="text-xs text-slate-400 mt-2">Sum of each FD’s estimated maturity using your rates (simple interest for the tool).</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-900 mb-3">Recommended FD split</p>
              <div className="flex flex-col gap-2">
                {results.ladder.map((rung, index) => (
                  <div key={`${rung.tenureMonths}-${index}`} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">
                        {rung.tenureMonths} month FD {rung.isSurplusBucket ? '(surplus return bucket)' : ''}
                      </p>
                      <p className="text-sm font-bold text-slate-900">₹{fmt(rung.amount)}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Rate: {rung.rate}% | Maturity value: ₹{fmt(rung.maturityAmount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <p className="text-sm font-semibold text-indigo-900 mb-2">Planning note</p>
              <p className="text-sm text-indigo-800 leading-relaxed">
                Keep at least one month of expenses (₹{fmt(results.instantLiquiditySuggestion)}) outside FDs in savings/liquid funds for immediate emergencies.
                The ladder then handles monthly needs through staggered maturities.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
