'use client'

import { useState } from 'react'
import CalculatorInput from '@/components/ui/CalculatorInput'
import { CITIES } from '@/constants/cityIndex'
import { calculateJobSwitch } from '@/utils/jobSwitchCalculator'

export default function JobSwitchCalculatorPage() {
  const [currentCTC, setCurrentCTC] = useState('')
  const [newCTC, setNewCTC] = useState('')
  const [currentCity, setCurrentCity] = useState('Hyderabad')
  const [newCity, setNewCity] = useState('Bangalore')
  const [results, setResults] = useState(null)

  const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"

  const [error, setError] = useState('')
  const preventNumberScroll = (event) => event.currentTarget.blur()

function handleCalculate() {
  setError('')

  if (!currentCTC || !newCTC) {
    setError('Please enter both your current and new CTC to calculate.')
    setResults(null)
    return
  }

  if (Number(currentCTC) <= 0 || Number(newCTC) <= 0) {
    setError('CTC values must be greater than zero.')
    setResults(null)
    return
  }

  if (Number(currentCTC) < 100000) {
    setError('Current CTC seems too low. Please enter annual CTC in rupees.')
    setResults(null)
    return
  }

  if (Number(newCTC) > 100000000) {
    setError('New CTC value seems unusually high. Please double check.')
    setResults(null)
    return
  }

  const result = calculateJobSwitch({
    currentCTC: Number(currentCTC),
    newCTC: Number(newCTC),
    currentCity,
    newCity,
  })
  setResults(result)
}

  function formatINR(amount) {
    return Math.abs(amount).toLocaleString('en-IN')
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Job Switch Salary Sanity Checker
          </h1>
          <p className="mt-2 text-slate-500">
            See your real purchasing power gain — not just the headline CTC difference.
          </p>
        </div>

        {/* Input Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6">

            <CalculatorInput
              label="Current Annual CTC"
              hint="Enter your total current CTC in rupees"
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 1500000"
                  value={currentCTC}
                  onChange={(e) => setCurrentCTC(e.target.value)}
                  onWheel={preventNumberScroll}
                  className={`${inputClass} pl-7`}
                />
              </div>
            </CalculatorInput>

            <CalculatorInput
              label="New Offered CTC"
              hint="Enter the CTC offered by the new company"
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 2200000"
                  value={newCTC}
                  onChange={(e) => setNewCTC(e.target.value)}
                  onWheel={preventNumberScroll}
                  className={`${inputClass} pl-7`}
                />
              </div>
            </CalculatorInput>

            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput label="Current City">
                <select
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  className={inputClass}
                >
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </CalculatorInput>

              <CalculatorInput label="New City">
                <select
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className={inputClass}
                >
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </CalculatorInput>
            </div>
            {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-sm text-red-700">{error}</p>
            </div>
            )}
            <button
              onClick={handleCalculate}
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Calculate Real Gain
            </button>

          </div>
        </div>

        {/* Results Card — only shows after calculation */}
        {results && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Unique Output — most prominent */}
            <div className={`rounded-xl p-5 mb-6 ${results.isRealLoss ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'}`}>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Real Purchasing Power Gain
              </p>
              <p className={`text-4xl font-black ${results.isRealLoss ? 'text-red-600' : 'text-emerald-600'}`}>
                {results.isRealLoss ? '−' : '+'}₹{formatINR(results.realGain)}
              </p>
              <p className={`text-sm font-semibold mt-1 ${results.isRealLoss ? 'text-red-500' : 'text-emerald-500'}`}>
                {results.realGainPercent > 0 ? '+' : ''}{results.realGainPercent}% real hike after city cost adjustment
              </p>
            </div>

            {/* Supporting Numbers */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-1">Nominal Hike (on paper)</p>
                <p className="text-xl font-bold text-slate-900">
                  +₹{formatINR(results.nominalGain)}
                </p>
                <p className="text-xs text-slate-500 mt-1">+{results.nominalGainPercent}%</p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-1">Break-even CTC in {newCity}</p>
                <p className="text-xl font-bold text-slate-900">
                  ₹{formatINR(results.breakEvenCTC)}
                </p>
                <p className="text-xs text-slate-500 mt-1">minimum to match current lifestyle</p>
              </div>
            </div>

            {/* Plain language insight */}
            <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-4">
              <p className="text-sm text-indigo-800">
                {results.isSameCity
                  ? `You are staying in ${currentCity}. Your real hike matches your nominal hike — no city cost adjustment needed.`
                  : results.isRealLoss
                  ? `Moving from ${currentCity} to ${newCity} costs you ${Math.abs(results.costDifferencePercent)}% more in living expenses. Your ₹${formatINR(results.nominalGain)} nominal hike is actually a purchasing power loss. You needed at least ₹${formatINR(results.breakEvenCTC)} just to break even.`
                  : `Moving from ${currentCity} to ${newCity} costs ${results.costDifferencePercent > 0 ? results.costDifferencePercent + '% more' : Math.abs(results.costDifferencePercent) + '% less'} in living expenses. Your ₹${formatINR(results.nominalGain)} nominal hike translates to a real gain of ₹${formatINR(results.realGain)} in purchasing power.`
                }
              </p>
            </div>

          </div>
        )}

      </div>
    </main>
  )
}