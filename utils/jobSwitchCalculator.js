import { CITY_INDEX } from '@/constants/cityIndex'

export function calculateJobSwitch({ currentCTC, newCTC, currentCity, newCity }) {
  const currentIndex = CITY_INDEX[currentCity]
  const newIndex = CITY_INDEX[newCity]

  // Adjust new CTC to equivalent purchasing power in current city
  const adjustedNewCTC = newCTC * (currentIndex / newIndex)

  const nominalGain = newCTC - currentCTC
  const realGain = adjustedNewCTC - currentCTC

  const nominalGainPercent = (nominalGain / currentCTC) * 100
  const realGainPercent = (realGain / currentCTC) * 100

  // Minimum CTC needed in new city to match current lifestyle
  const breakEvenCTC = currentCTC * (newIndex / currentIndex)

  const costDifferencePercent = ((newIndex - currentIndex) / currentIndex) * 100

  return {
    nominalGain: Math.round(nominalGain),
    realGain: Math.round(realGain),
    nominalGainPercent: parseFloat(nominalGainPercent.toFixed(1)),
    realGainPercent: parseFloat(realGainPercent.toFixed(1)),
    adjustedNewCTC: Math.round(adjustedNewCTC),
    breakEvenCTC: Math.round(breakEvenCTC),
    costDifferencePercent: parseFloat(costDifferencePercent.toFixed(1)),
    isRealLoss: realGain < 0,
    isSameCity: currentCity === newCity,
  }
}