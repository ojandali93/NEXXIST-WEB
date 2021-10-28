import React, { useContext } from 'react'
import { PropertyContext } from './App.js'

export default function PropertyERClosed(props) {
  const {
    property
  } = props;

  const { calculateMontlyExpenses } = useContext(PropertyContext)
  const { handlePropertyRevenueExpensesEdit } = useContext(PropertyContext)

  let totalMonthlyPayment = calculateMontlyExpenses(property)

  return (
    <>
      <div className="e-and-r-container">
        <p>Revenue &#38; Expenses:</p>
        <button onClick={() => {handlePropertyRevenueExpensesEdit()}}>EDIT</button>
      </div>
      <div className="e-and-r-container">
        <p>Monthly Expenses: {totalMonthlyPayment}</p>
        <p>Monthly Revenue: {property.rent}</p>
      </div>
      <div>
        <p>** Monthly Expenses based on 20% down payment 30 year fixed mortage @ 3.15% interest rate **</p>
      </div>
    </>
  )
}
