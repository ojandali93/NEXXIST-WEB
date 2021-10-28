import React from 'react'

export default function PropertyExpAndRev(props) {
  const {
    property
  } = props;

  function calculateMonthlyMortgage(){
    let loanAmount = parseInt(property.price) * .8
    let interestRate = .0315 / 12
    let powerRate = Math.pow(1 + interestRate, 360)
    let monthlyPayment = parseInt(loanAmount) * (interestRate * powerRate) / (powerRate - 1)
    return monthlyPayment
  }

  function calculateMontlyExpenses(){
    let monthlyPayment = calculateMonthlyMortgage()
    return parseInt(property.hoa) + parseInt(property.property_tax) + parseInt(property.home_insurance) + parseInt(monthlyPayment)
  }

  let totalMonthlyPayment = calculateMontlyExpenses()

  return (
    <div className="property-expenses-and-revenue-container">
      <div className="e-and-r-container">
        <p>Revenue &#38; Expenses:</p>
        <button>EDIT</button>
      </div>
      <div className="e-and-r-container">
        <p>Monthly Expenses: {totalMonthlyPayment}</p>
        <p>Monthly Revenue: {property.rent}</p>
      </div>
      <div>
        <p>** Monthly Expenses based on 20% down payment 30 year fixed mortage @ 3.15% interest rate **</p>
      </div>
    </div>
  )
}
