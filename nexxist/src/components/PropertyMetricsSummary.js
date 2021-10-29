import React, { useContext } from 'react'
import { PropertyContext } from './App.js'
import ExpandMetrics from './ExpandMetrics.js'

export default function PropertyMetricsSummary(props) {
  const {
    property
  } = props

  const { calculateCashFlow } = useContext(PropertyContext)
  const { calculateNetOperatingIncome } = useContext(PropertyContext)
  const { calculateReturnOnInvestment } = useContext(PropertyContext)
  const { expandedMetrics } = useContext(PropertyContext)
  const { selectedPropertyId } = useContext(PropertyContext)
  const { handleMetricsOpen } = useContext(PropertyContext)
  const { handleMetricsClose } = useContext(PropertyContext)

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
      {
        expandedMetrics && selectedPropertyId === property.id ? <ExpandMetrics property={property}/>  : null
      }
      <div className="more-metrics-button">
        {
          expandedMetrics && selectedPropertyId ? <button onClick={() => {handleMetricsClose(property.id)}}>Less Metrics</button> : <button onClick={() => {handleMetricsOpen(property.id)}}>More Metrics</button>
        }
      </div>
    </div>
  )
}
