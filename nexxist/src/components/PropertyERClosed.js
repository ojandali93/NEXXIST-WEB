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
      <div className="expenses-container">
        <p>Monthly Costs</p>
        <button onClick={() => {handlePropertyRevenueExpensesEdit(property.id)}}>EDIT</button>
      </div>
      <div>
        <p>Principle &amp; Interest:</p>
        <div>
          
        </div>
      </div>
      <div>
        <p>** Loan based on 20% down payment 30 year fixed mortage @ 3.15% interest rate **</p>
      </div>
    </>
  )
}
