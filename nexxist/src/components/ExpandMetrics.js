import React, { useContext } from 'react'
import { PropertyContext } from './App.js'

export default function ExpandMetrics(props) {
  const {
    property
  } = props

  const { calculateCashOnCashFlow } = useContext(PropertyContext)
  const { calculateGrossOperatingIncome } = useContext(PropertyContext)
  const { calculateOperatingExpenseRatio } = useContext(PropertyContext)
  const { calculateRentCostRatio } = useContext(PropertyContext)
  const { calculateGrossRentMultiplier } = useContext(PropertyContext)
  const { calculateVaccancyRate } = useContext(PropertyContext)

  let cashOnCashFlow = calculateCashOnCashFlow(property)
  let grossOperatingIncome = calculateGrossOperatingIncome(property)
  let operatingIncomeRatio = calculateOperatingExpenseRatio(property)
  let rentCostRatio = calculateRentCostRatio(property)
  let grossRentMultiplier = calculateGrossRentMultiplier(property)
  let vaccancyRate = calculateVaccancyRate(property)

  return (
    <>
      <div className="key-metrics-section">
        <p>CoCF: {cashOnCashFlow.toFixed(2)}</p>
        <p>OER: {operatingIncomeRatio.toFixed(2)}</p>
        <p>RCR: {rentCostRatio.toFixed(2)}</p>
      </div>
      <div className="key-metrics-section">
        <p>GOI: {grossOperatingIncome.toFixed(2)} @ 8% VR</p>
        <p>GRM: {grossRentMultiplier.toFixed(2)}</p>
        <p>VR: {vaccancyRate.toFixed(2)}</p>
      </div>
    </>
  )
}
