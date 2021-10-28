import React from 'react'
import PropertyMonthlyExpenses from './PropertyMonthlyExpenses'

export default function PropertyExpAndRev(props) {
  const {
    property
  } = props;

  return (
    <div className="property-expenses-and-revenue-container">
      <PropertyMonthlyExpenses property={property}/>
    </div>
  )
}
