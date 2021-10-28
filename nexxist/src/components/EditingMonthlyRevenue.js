import React from 'react'

export default function EditingMonthlyRevenue(props) {
  const {
    property
  } = props 

  return (
    <>
      <div>
        <label>Monthly Rent:</label>
        <input type="integer" />
      </div>
      <div>
        <label>Additional Revenue:</label>
        <input type="integer" />
      </div>
    </>
  )
}
