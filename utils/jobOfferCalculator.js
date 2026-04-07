export function calculateJobOfferTrueValue({
  currentMonthlyInHand,
  currentAnnualFixedPay,
  offeredFixedAnnual,
  variableAnnualTarget,
  variablePayoutConfidence,
  joiningBonus,
  retentionOrRelocationBonus,
  annualBenefitsValue,
  oneTimeHorizonMonths,
}) {
  const currentMonthly = Number(currentMonthlyInHand) || 0
  const currentAnnualFixed = Number(currentAnnualFixedPay) || 0
  const fixedAnnual = Number(offeredFixedAnnual) || 0
  const variableAnnual = Number(variableAnnualTarget) || 0
  const payoutConfidence = (Number(variablePayoutConfidence) || 0) / 100
  const joining = Number(joiningBonus) || 0
  const oneTimeExtra = Number(retentionOrRelocationBonus) || 0
  const benefitsAnnual = Number(annualBenefitsValue) || 0
  const horizonMonths = Number(oneTimeHorizonMonths) || 12

  const currentGrossMonthly = currentAnnualFixed > 0 ? currentAnnualFixed / 12 : 0
  // Approximate post-deduction ratio from current payslip baseline.
  const takeHomeRatio =
    currentGrossMonthly > 0
      ? Math.min(Math.max(currentMonthly / currentGrossMonthly, 0.45), 0.9)
      : 1

  const guaranteedMonthlyGross = fixedAnnual / 12
  const expectedVariableMonthlyGross = (variableAnnual * payoutConfidence) / 12
  const oneTimeMonthlyEquivalentGross = (joining + oneTimeExtra) / horizonMonths
  const benefitsMonthlyGross = benefitsAnnual / 12

  const guaranteedMonthly = guaranteedMonthlyGross * takeHomeRatio
  const expectedVariableMonthly = expectedVariableMonthlyGross * takeHomeRatio
  const oneTimeMonthlyEquivalent = oneTimeMonthlyEquivalentGross * takeHomeRatio
  const benefitsMonthly = benefitsMonthlyGross

  const trueMonthlyValue =
    guaranteedMonthly +
    expectedVariableMonthly +
    oneTimeMonthlyEquivalent +
    benefitsMonthly

  const guaranteedMonthlyGain = guaranteedMonthly - currentMonthly
  const realisticMonthlyGain = trueMonthlyValue - currentMonthly

  const headlineAnnualOffer =
    fixedAnnual +
    variableAnnual +
    joining +
    oneTimeExtra +
    benefitsAnnual

  return {
    currentMonthlyInHand: Math.round(currentMonthly),
    currentAnnualFixedPay: Math.round(currentAnnualFixed),
    currentGrossMonthly: Math.round(currentGrossMonthly),
    takeHomeRatioPercent: Math.round(takeHomeRatio * 100),
    guaranteedMonthly: Math.round(guaranteedMonthly),
    expectedVariableMonthly: Math.round(expectedVariableMonthly),
    oneTimeMonthlyEquivalent: Math.round(oneTimeMonthlyEquivalent),
    benefitsMonthly: Math.round(benefitsMonthly),
    trueMonthlyValue: Math.round(trueMonthlyValue),
    guaranteedMonthlyGain: Math.round(guaranteedMonthlyGain),
    realisticMonthlyGain: Math.round(realisticMonthlyGain),
    headlineAnnualOffer: Math.round(headlineAnnualOffer),
    payoutConfidencePercent: Math.round(payoutConfidence * 100),
    horizonMonths,
    isGuaranteedDrop: guaranteedMonthlyGain < 0,
    isRealisticDrop: realisticMonthlyGain < 0,
  }
}
