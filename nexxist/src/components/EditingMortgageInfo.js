import React, { useContext } from 'react'
import { PropertyContext } from './App.js'

export default function EditingMortgageInfo(props) {
  const {
    property
  } = props;

  const { calculateMontlyExpenses } = useContext(PropertyContext)
  const { calculateMonthlyMortgage } = useContext(PropertyContext)
  const { handleEditingMortagePaymentOpen } = useContext(PropertyContext)
  const { handleEditingMortagePaymentClose } = useContext(PropertyContext)

  let totalMonthlyPayment = calculateMontlyExpenses(property)
  let monthlyMortgage = calculateMonthlyMortgage(property.price)

  return (
    <>
      <div>
        <label>Home Price:</label>
        <input type="integer"/>
      </div>
      <div>
        <label>Down Payment:</label>
        <input type="integer"/>
        <input max="100" type="integer"/>
      </div>
      <div>
        <label>Loan Program:</label>
        <select name="loan-programs" id="loan-programs">
          <option value="30-year-fixed">30 year fixed</option>
          <option value="30-year-fixed">15 year fixed</option>
        </select>
      </div>
      <div>
        <label>Interest Rate:</label>
        <input type="integer"/>
      </div>
    </>
  )
}
