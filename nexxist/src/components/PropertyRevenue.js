import React, { useContext } from 'react'
import { PropertyContext } from './App.js'
import EditingMonthlyRevenue from './EditingMonthlyRevenue.js'

export default function PropertyRevenue(props) {
  const {
    property
  } = props;

  const { selectedPropertyId } = useContext(PropertyContext)
  const { currentlyEditingRentRevenue } = useContext(PropertyContext)
  const { handleEditingRentRevenueOpen } = useContext(PropertyContext)
  const { handleEditingRentRevenueClose } = useContext(PropertyContext)

  return (
    <div className="key-metrics-container">
      <div>
        <p>Monthly Revenue</p>
      </div>
      <div className="monthly-expense-value-conatiner">
        <p>Estimated Monthly Rent:</p>
        <p>${property.rent}</p>
        {
          currentlyEditingRentRevenue && selectedPropertyId ? <button onClick={() => {handleEditingRentRevenueClose(property.id)}}>Done</button> : <button onClick={() => {handleEditingRentRevenueOpen(property.id)}}>Edit</button>
        }
      </div>
      {
        currentlyEditingRentRevenue && selectedPropertyId === property.id ? <EditingMonthlyRevenue property={property}/> : null
      }
    </div>
  )
}
