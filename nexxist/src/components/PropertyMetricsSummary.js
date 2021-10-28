import React, { useContext } from 'react'
import { PropertyContext } from './App.js'

export default function PropertyMetricsSummary(props) {
  const {
    property
  } = props

  const { calculateCashFlow } = useContext(PropertyContext)
  const { calculateNetOperatingIncome } = useContext(PropertyContext)
  const { calculateReturnOnInvestment } = useContext(PropertyContext)

  let cashFlow = calculateCashFlow(property).toFixed(2)
  let netOperatingIncome = calculateNetOperatingIncome(property).toFixed(2)
  let returnOnInvestment = calculateReturnOnInvestment(property).toFixed(2)

  return (
    <div className="key-metrics-container">
      <div>
        <p>Key Metrics:</p>
      </div>
      <div className="key-metrics-section">
        <p>CF: {cashFlow}</p>
        <p>NOI: {netOperatingIncome}</p>
        <p>ROI: {returnOnInvestment}</p>
      </div>
      <div className="more-metrics-button">
        <button>More Metrics</button>
      </div>
    </div>
  )
}
