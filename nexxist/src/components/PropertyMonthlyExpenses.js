import React, { useContext } from 'react'
import { PropertyContext } from './App.js'
import EditingMortgageInfo from './EditingMortgageInfo.js'
import EditingPropertyTax from './EditingPropertyTax.js'
import EditingHomeInsurance from './EditingHomeInsurance.js'
import EditingHOA from './EditingHOA.js'
import EditingAdditionalExpenses from './EditingAdditionalExpenses.js'

export default function PropertyMonthlyExpenses(props) {
  const {
    property
  } = props;


  const { selectedPropertyId } = useContext(PropertyContext)
  const { calculateMontlyExpenses } = useContext(PropertyContext)
  const { calculateMonthlyMortgage } = useContext(PropertyContext)
  const { currentlyEditingMortgagePayments } = useContext(PropertyContext)
  const { currentlyEditingPropertyTax } = useContext(PropertyContext)
  const { currentlyEditingHomeInsurance } = useContext(PropertyContext)
  const { currentlyEditingHOA } = useContext(PropertyContext)
  const { currentlyEditingAdditionalExpenses } = useContext(PropertyContext)
  const { handleEditingMortagePaymentOpen } = useContext(PropertyContext)
  const { handleEditingMortagePaymentClose } = useContext(PropertyContext)
  const { handleEditingPropertyTaxOpen } = useContext(PropertyContext)
  const { handleEditingPropertyTaxClose } = useContext(PropertyContext)
  const { handleEditingHomeInsuranceOpen } = useContext(PropertyContext)
  const { handleEditingHomeInsuranceClose } = useContext(PropertyContext)
  const { handleEditingHOAOpen } = useContext(PropertyContext)
  const { handleEditingHOAClose } = useContext(PropertyContext)
  const { handleEditingAdditionalExpensesOpen } = useContext(PropertyContext)
  const { handleEditingAdditionalExpensesClose } = useContext(PropertyContext)

  let totalMonthlyPayment = calculateMontlyExpenses(property)
  let monthlyMortgage = calculateMonthlyMortgage(property)
  console.log(`monthlyMortgage: ${monthlyMortgage}`)

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
          {
            currentlyEditingMortgagePayments && selectedPropertyId ? <button onClick={() => {handleEditingMortagePaymentClose()}}>Done</button> : <button onClick={() => {handleEditingMortagePaymentOpen(property)}}>Edit</button>
          }
        </div>
      </div>
      {
        currentlyEditingMortgagePayments && selectedPropertyId === property.zpid ? <EditingMortgageInfo property={property}/> : null
      }
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
          <p>${property.taxAnnualAmount}</p>
          {
            currentlyEditingPropertyTax && selectedPropertyId ? <button onClick={() => {handleEditingPropertyTaxClose()}}>Done</button> : <button onClick={() => {handleEditingPropertyTaxOpen(property)}}>Edit</button>
          }
        </div>
      </div>
      {
        currentlyEditingPropertyTax && selectedPropertyId === property.zpid ? <EditingPropertyTax property={property}/> : null
      }
      <div className="monthly-expense-container">
        <p>Home Insurance:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${(property.annualHomeInsurance / 12).toFixed(2)}</p>
          {
            currentlyEditingHomeInsurance && selectedPropertyId ? <button onClick={() => {handleEditingHomeInsuranceClose()}}>Done</button> : <button onClick={() => {handleEditingHomeInsuranceOpen(property)}}>Edit</button>
          }
        </div>
      </div>
      {
        currentlyEditingHomeInsurance && selectedPropertyId === property.zpid ? <EditingHomeInsurance property={property}/> : null
      }
      <div className="monthly-expense-container">
        <p>HOA Fees:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${property.hoaFee === null ? 0 : property.hoaFee}</p>
          {
            currentlyEditingHOA && selectedPropertyId ? <button onClick={() => {handleEditingHOAClose()}}>Done</button> : <button onClick={() => {handleEditingHOAOpen(property)}}>Edit</button>
          }
        </div>
      </div>
      {
        currentlyEditingHOA && selectedPropertyId === property.zpid ? <EditingHOA property={property}/> : null
      }
      <div className="monthly-expense-container">
        <p>Additional Expenses:</p>
        <div className="monthly-expense-value-conatiner">
          <p>${0}</p>
          {
            currentlyEditingAdditionalExpenses && selectedPropertyId ? <button onClick={() => {handleEditingAdditionalExpensesClose()}}>Done</button> : <button onClick={() => {handleEditingAdditionalExpensesOpen(property)}}>Edit</button>
          }
        </div>
      </div>
      {
        currentlyEditingAdditionalExpenses && selectedPropertyId === property.zpid ? <EditingAdditionalExpenses property={property}/> : null
      }
      <div>
        <p>** Loan based on 20% down payment 30 year fixed mortage @ 3.15% interest rate **</p>
      </div>
    </>
  )
}
