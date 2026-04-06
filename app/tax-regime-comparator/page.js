'use client'

import { useState } from 'react'
import CalculatorInput from '@/components/ui/CalculatorInput'
import {
  TAX_YEAR,
  SECTION_80C_ITEMS,
  SECTION_80C_LIMIT,
  SECTION_80D_ITEMS,
} from '@/constants/taxConfig'
import { calculateTaxRegimes } from '@/utils/taxRegimeCalculator'

const TOGGLE_DEFAULT = {
  hra: false,
  section80c: false,
  section80d: false,
  nps: false,
  homeLoan: false,
}

export default function TaxRegimeComparatorPage() {
  const [grossSalary, setGrossSalary] = useState('')
  const [toggles, setToggles] = useState(TOGGLE_DEFAULT)
  const [hraReceived, setHraReceived] = useState('')
  const [rentPaid, setRentPaid] = useState('')
  const [basicSalary, setBasicSalary] = useState('')
  const [isMetro, setIsMetro] = useState(false)
  const [items80c, setItems80c] = useState(
    Object.fromEntries(SECTION_80C_ITEMS.map(i => [i.id, '']))
  )
  const [items80d, setItems80d] = useState(
    Object.fromEntries(SECTION_80D_ITEMS.map(i => [i.id, '']))
  )
  const [npsAmount, setNpsAmount] = useState('')
  const [homeLoanInterest, setHomeLoanInterest] = useState('')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const [showNewSlabs, setShowNewSlabs] = useState(false)
  const [showOldSlabs, setShowOldSlabs] = useState(false)

  const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"

  function toggleSection(key) {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handle80cChange(id, value) {
    setItems80c(prev => ({ ...prev, [id]: value }))
  }

  function handle80dChange(id, value) {
    setItems80d(prev => ({ ...prev, [id]: value }))
  }

  const total80c = Object.values(items80c).reduce((sum, v) => sum + (Number(v) || 0), 0)
  const capped80c = Math.min(total80c, SECTION_80C_LIMIT)
  const total80cPercent = Math.min((total80c / SECTION_80C_LIMIT) * 100, 100)

  function handleCalculate() {
    setError('')
    setResults(null)

    if (!grossSalary || Number(grossSalary) <= 0) {
      setError('Please enter your gross annual salary to compare.')
      return
    }
    if (Number(grossSalary) > 100000000) {
      setError('Salary seems unusually high. Please double check.')
      return
    }
    if (toggles.hra && (!basicSalary || !hraReceived || !rentPaid)) {
        setError('Please fill in all HRA fields — Basic Salary, HRA Received, and Rent Paid.')
        setResults(null)
        return
    }

    const result = calculateTaxRegimes({
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
    })
    setResults(result)
  }

  function fmt(amount) {
    return Math.abs(amount).toLocaleString('en-IN')
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">{TAX_YEAR}</p>
          <h1 className="text-3xl font-bold text-slate-900">
            New vs Old Tax Regime Comparator
          </h1>
          <p className="mt-2 text-slate-500">
            Find the exact break-even point — and which regime saves you more money.
          </p>
        </div>

        {/* Salary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-4">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Your Salary</h2>
          <CalculatorInput
            label="Gross Annual Salary (CTC)"
            hint="Enter your total annual salary before any deductions"
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
              <input
                type="number"
                placeholder="e.g. 1500000"
                value={grossSalary}
                onChange={e => setGrossSalary(e.target.value)}
                className={`${inputClass} pl-7`}
              />
            </div>
          </CalculatorInput>
        </div>

        {/* HRA Toggle */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => toggleSection('hra')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
          >
            <div>
              <p className="text-base font-semibold text-slate-900">Do you pay rent?</p>
              <p className="text-xs text-slate-400 mt-0.5">Including rent paid to parents</p>
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${toggles.hra ? 'text-indigo-600' : 'text-slate-400'}`}>
              {toggles.hra ? 'Yes' : 'No'}
              <span className="text-lg">{toggles.hra ? '↑' : '↓'}</span>
            </div>
          </button>
          {toggles.hra && (
            <div className="px-6 pb-6 flex flex-col gap-5 border-t border-slate-100 pt-5">
              <CalculatorInput label="Basic Salary (Annual)" hint="Check your payslip — Basic is usually 40-50% of CTC">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                  <input type="number" placeholder="e.g. 600000" value={basicSalary} onChange={e => setBasicSalary(e.target.value)} className={`${inputClass} pl-7`} />
                </div>
              </CalculatorInput>
              <CalculatorInput label="HRA Received (Annual)" hint="Check your payslip — look for HRA component and multiply by 12">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                  <input type="number" placeholder="e.g. 240000" value={hraReceived} onChange={e => setHraReceived(e.target.value)} className={`${inputClass} pl-7`} />
                </div>
              </CalculatorInput>
              <CalculatorInput label="Rent Paid (Annual)" hint="Monthly rent × 12">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                  <input type="number" placeholder="e.g. 180000" value={rentPaid} onChange={e => setRentPaid(e.target.value)} className={`${inputClass} pl-7`} />
                </div>
              </CalculatorInput>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-700">Do you live in a metro city?</p>
                  <p className="text-xs text-slate-400 mt-0.5">Mumbai, Delhi, Kolkata, Chennai</p>
                </div>
                <button
                  onClick={() => setIsMetro(prev => !prev)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isMetro ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isMetro ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 80C Toggle */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => toggleSection('section80c')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-slate-900">Do you invest in tax-saving instruments?</p>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Section 80C</span>
                </div>
              <p className="text-xs text-slate-400 mt-0.5">EPF, PPF, ELSS, LIC, NSC and more — max ₹1,50,000</p>
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${toggles.section80c ? 'text-indigo-600' : 'text-slate-400'}`}>
              {toggles.section80c ? 'Yes' : 'No'}
              <span className="text-lg">{toggles.section80c ? '↑' : '↓'}</span>
            </div>
          </button>
          {toggles.section80c && (
            <div className="px-6 pb-6 border-t border-slate-100 pt-5">
              <div className="flex flex-col gap-5 mb-5">
                {SECTION_80C_ITEMS.map(item => (
                  <CalculatorInput key={item.id} label={item.label} hint={item.hint}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={items80c[item.id]}
                        onChange={e => handle80cChange(item.id, e.target.value)}
                        className={`${inputClass} pl-7`}
                      />
                    </div>
                  </CalculatorInput>
                ))}
              </div>
              <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-indigo-800">Your 80C Total</p>
                  <p className="text-sm font-bold text-indigo-800">
                    ₹{capped80c.toLocaleString('en-IN')}
                    <span className="text-indigo-400 font-normal"> / ₹1,50,000 limit</span>
                  </p>
                </div>
                <div className="w-full bg-indigo-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${total80cPercent}%` }} />
                </div>
                {total80c > SECTION_80C_LIMIT && (
                  <p className="text-xs text-indigo-600 mt-2">
                    ₹{(total80c - SECTION_80C_LIMIT).toLocaleString('en-IN')} above the limit — only ₹1,50,000 will be considered
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 80D Toggle */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => toggleSection('section80d')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-slate-900">Any medical insurance or health expenses?</p>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Section 80D</span>
                </div>
              <p className="text-xs text-slate-400 mt-0.5">Health insurance premiums, preventive checkups</p>
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${toggles.section80d ? 'text-indigo-600' : 'text-slate-400'}`}>
              {toggles.section80d ? 'Yes' : 'No'}
              <span className="text-lg">{toggles.section80d ? '↑' : '↓'}</span>
            </div>
          </button>
          {toggles.section80d && (
            <div className="px-6 pb-6 border-t border-slate-100 pt-5 flex flex-col gap-5">
              {SECTION_80D_ITEMS.map(item => (
                <CalculatorInput key={item.id} label={item.label} hint={item.hint}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={items80d[item.id]}
                      onChange={e => handle80dChange(item.id, e.target.value)}
                      className={`${inputClass} pl-7`}
                    />
                  </div>
                </CalculatorInput>
              ))}
            </div>
          )}
        </div>

        {/* NPS Toggle */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => toggleSection('nps')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-slate-900">Do you contribute to NPS additionally?</p>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">80CCD(1B)</span>
                </div>
              <p className="text-xs text-slate-400 mt-0.5">Over and above your employer's NPS contribution — max ₹50,000</p>
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${toggles.nps ? 'text-indigo-600' : 'text-slate-400'}`}>
              {toggles.nps ? 'Yes' : 'No'}
              <span className="text-lg">{toggles.nps ? '↑' : '↓'}</span>
            </div>
          </button>
          {toggles.nps && (
            <div className="px-6 pb-6 border-t border-slate-100 pt-5">
              <CalculatorInput label="Additional NPS Contribution (Annual)" hint="Check your NPS account statement or payslip — max ₹50,000">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                  <input type="number" placeholder="0" value={npsAmount} onChange={e => setNpsAmount(e.target.value)} className={`${inputClass} pl-7`} />
                </div>
              </CalculatorInput>
            </div>
          )}
        </div>

        {/* Home Loan Toggle */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm mb-6 overflow-hidden">
          <button
            onClick={() => toggleSection('homeLoan')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-slate-900">Do you have a home loan?</p>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Section 24(b)</span>
                </div>
              <p className="text-xs text-slate-400 mt-0.5">Interest paid on home loan for self-occupied property — max ₹2,00,000</p>
            </div>
            <div className={`flex items-center gap-2 text-sm font-semibold ${toggles.homeLoan ? 'text-indigo-600' : 'text-slate-400'}`}>
              {toggles.homeLoan ? 'Yes' : 'No'}
              <span className="text-lg">{toggles.homeLoan ? '↑' : '↓'}</span>
            </div>
          </button>
          {toggles.homeLoan && (
            <div className="px-6 pb-6 border-t border-slate-100 pt-5">
              <CalculatorInput label="Home Loan Interest Paid (Annual)" hint="Check your home loan statement — look for interest component in EMI breakup">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                  <input type="number" placeholder="0" value={homeLoanInterest} onChange={e => setHomeLoanInterest(e.target.value)} className={`${inputClass} pl-7`} />
                </div>
              </CalculatorInput>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors mb-8"
        >
          Compare Both Regimes
        </button>

        {/* Results */}
        {results && (
          <div className="flex flex-col gap-4">

            {/* Winner Banner */}
            <div className={`rounded-2xl p-6 ${
              results.betterRegime === 'new'
                ? 'bg-emerald-600'
                : results.betterRegime === 'old'
                ? 'bg-indigo-600'
                : 'bg-slate-600'
            }`}>
              <p className="text-sm font-medium text-white/70 mb-1">Better regime for you</p>
              <p className="text-2xl font-black text-white mb-1">
                {results.betterRegime === 'new'
                  ? 'New Tax Regime'
                  : results.betterRegime === 'old'
                  ? 'Old Tax Regime'
                  : 'Both regimes are equal'}
              </p>
              {results.savings > 0 && (
                <p className="text-white/80 text-sm">
                  Saves you{' '}
                  <span className="font-bold text-white">₹{fmt(results.savings)}/year</span>
                  {' '}—{' '}
                  <span className="font-bold text-white">₹{fmt(results.monthlySavings)}/month</span>
                  {' '}extra in hand
                </p>
              )}
            </div>

            {/* Side by Side Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* New Regime Card */}
              <div className={`rounded-2xl border bg-white p-5 flex flex-col gap-3 ${
                results.betterRegime === 'new'
                  ? 'border-emerald-300 ring-2 ring-emerald-100'
                  : 'border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">New Regime</p>
                  {results.betterRegime === 'new' && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">Better</span>
                  )}
                </div>

                {/* Income derivation */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Gross Salary</span>
                    <span className="font-medium text-slate-700">₹{fmt(results.grossSalary)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 pl-2 border-l-2 border-slate-100">
                    <span>− Std Deduction</span>
                    <span className="font-medium text-emerald-600">−₹{fmt(results.newRegime.standardDeduction)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-slate-800 pt-1 border-t border-slate-100">
                    <span>= Taxable Income</span>
                    <span>₹{fmt(results.newRegime.taxableIncome)}</span>
                  </div>
                </div>

                {/* Tax calculation */}
                <div className="flex flex-col gap-1.5 text-xs bg-slate-50 rounded-xl p-3">
                  <div className="flex justify-between text-slate-500">
                    <span>Tax on slabs</span>
                    <span className="font-medium text-slate-700">₹{fmt(results.newRegime.taxOnSlabs)}</span>
                  </div>

                  {/* Slab breakdown toggle */}
                  <button
                    onClick={() => setShowNewSlabs(p => !p)}
                    className="text-left text-indigo-500 hover:text-indigo-700 text-xs font-medium"
                  >
                    {showNewSlabs ? '↑ Hide breakdown' : '↓ See slab breakdown'}
                  </button>

                  {showNewSlabs && (
                    <div className="flex flex-col gap-1 mt-1 pl-2 border-l-2 border-indigo-100">
                      {results.newRegime.slabBreakdown.map((s, i) => (
                        <div key={i} className="flex justify-between text-slate-400">
                          <span>{s.label} @ {s.rate}</span>
                          <span>₹{fmt(s.tax)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500">
                    <span>+ Cess (4%)</span>
                    <span className="font-medium text-slate-700">₹{fmt(results.newRegime.cess)}</span>
                  </div>
                  <div className="flex justify-between font-black text-slate-900 border-t border-slate-200 pt-1.5">
                    <span>= Total Tax</span>
                    <span className="text-sm">₹{fmt(results.newRegime.totalTax)}</span>
                  </div>
                </div>
              </div>

              {/* Old Regime Card */}
              <div className={`rounded-2xl border bg-white p-5 flex flex-col gap-3 ${
                results.betterRegime === 'old'
                  ? 'border-indigo-300 ring-2 ring-indigo-100'
                  : 'border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">Old Regime</p>
                  {results.betterRegime === 'old' && (
                    <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">Better</span>
                  )}
                </div>

                {/* Income derivation with deduction breakdown */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Gross Salary</span>
                    <span className="font-medium text-slate-700">₹{fmt(results.grossSalary)}</span>
                  </div>
                  <div className="flex flex-col gap-1 pl-2 border-l-2 border-slate-100">
                    {results.oldRegime.deductionBreakdown.map((d, i) => (
                      <div key={i} className="flex justify-between text-slate-500">
                        <span>− {d.label}</span>
                        <span className="font-medium text-emerald-600">−₹{fmt(d.amount)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-semibold text-slate-800 pt-1 border-t border-slate-100">
                    <span>= Taxable Income</span>
                    <span>₹{fmt(results.oldRegime.taxableIncome)}</span>
                  </div>
                </div>

                {/* Tax calculation */}
                <div className="flex flex-col gap-1.5 text-xs bg-slate-50 rounded-xl p-3">
                  <div className="flex justify-between text-slate-500">
                    <span>Tax on slabs</span>
                    <span className="font-medium text-slate-700">₹{fmt(results.oldRegime.taxOnSlabs)}</span>
                  </div>

                  <button
                    onClick={() => setShowOldSlabs(p => !p)}
                    className="text-left text-indigo-500 hover:text-indigo-700 text-xs font-medium"
                  >
                    {showOldSlabs ? '↑ Hide breakdown' : '↓ See slab breakdown'}
                  </button>

                  {showOldSlabs && (
                    <div className="flex flex-col gap-1 mt-1 pl-2 border-l-2 border-indigo-100">
                      {results.oldRegime.slabBreakdown.map((s, i) => (
                        <div key={i} className="flex justify-between text-slate-400">
                          <span>{s.label} @ {s.rate}</span>
                          <span>₹{fmt(s.tax)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500">
                    <span>+ Cess (4%)</span>
                    <span className="font-medium text-slate-700">₹{fmt(results.oldRegime.cess)}</span>
                  </div>
                  <div className="flex justify-between font-black text-slate-900 border-t border-slate-200 pt-1.5">
                    <span>= Total Tax</span>
                    <span className="text-sm">₹{fmt(results.oldRegime.totalTax)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Unused Hints */}
            {results.unusedHints.length > 0 && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-bold text-amber-800 mb-3">Unused tax saving opportunities</p>
                <div className="flex flex-col gap-2">
                  {results.unusedHints.map((hint, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">→</span>
                      <p className="text-sm text-amber-700">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  )
}