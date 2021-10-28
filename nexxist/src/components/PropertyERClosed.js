import React, { useContext } from 'react'
import { PropertyContext } from './App.js'

export default function PropertyERClosed(props) {
  const {
    property
  } = props;

  const { calculateMontlyExpenses } = useContext(PropertyContext)
  const { calculateMonthlyMortgage } = useContext(PropertyContext)
  const { handlePropertyRevenueExpensesEdit } = useContext(PropertyContext)

  let totalMonthlyPayment = calculateMontlyExpenses(property)
  let monthlyMortgage = calculateMonthlyMortgage(property.price)

  return (
    <>
      <div className="expenses-container">
        <p>Monthly Costs</p>
      </div>
      <p>{totalMonthlyPayment}</p>
      <div className="monthly-expense-container">
        <p>Principle &amp; Interest:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${monthlyMortgage.toFixed(2)}</p>
          <button>Edit</button>
        </div>
      </div>
      <div className="monthly-expense-container">
        <p>Mortgage Insurance:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${0}</p>
          <button>Edit</button>
        </div>
      </div>
      <div className="monthly-expense-container">
        <p>Property Tax:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${property.property_tax}</p>
          <button>Edit</button>
        </div>
      </div>
      <div className="monthly-expense-container">
        <p>Home Insurance:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${property.home_insurance}</p>
          <button>Edit</button>
        </div>
      </div>
      <div className="monthly-expense-container">
        <p>HOA Fees:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${property.hoa}</p>
          <button>Edit</button>
        </div>
      </div>
      <div className="monthly-expense-container">
        <p>Additional Expenses:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${0}</p>
          <button>Edit</button>
        </div>
      </div>
      <div>
        <p>** Loan based on 20% down payment 30 year fixed mortage @ 3.15% interest rate **</p>
      </div>
    </>
  )
}
