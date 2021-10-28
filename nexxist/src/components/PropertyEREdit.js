import React, { useContext } from 'react'
import { PropertyContext } from './App.js'

export default function PropertyEREdit(props) {
  const {
    property
  } = props;

  const { calculateLoanAmount } = useContext(PropertyContext)
  const { calculateDownPayment } = useContext(PropertyContext)
  const { calculateClosingCost } = useContext(PropertyContext)
  const { handlePropertyRevenueExpensesCollapse } = useContext(PropertyContext)

  let loanAmount = calculateLoanAmount(property.price)
  let downPayment = calculateDownPayment(property.price)
  let closingCost = calculateClosingCost(property.price)

  return (
    <>
      <div className="e-and-r-container">
        <p>Revenue &#38; Expenses:</p>
      </div>
      <div>
        <p>Expenses/Mortgage</p>
      </div>
      <div>
        <label>Home Price:</label>
        <input type="integer" onInput={(e) => {console.log(e.target.value)}} defaultValue={property.price}/>
      </div>
      <div>
        <label>Down Payment:</label>
        <input type="integer" onInput={(e) => {console.log(e.target.value)}} defaultValue={downPayment}/>
        <input type="integer" min="0" max="100" onInput={(e) => {console.log(e.target.value)}} defaultValue={20}/>
      </div>
      <div>
        <label>Loan Amount:</label>
        <input type="integer" onInput={(e) => {console.log(e.target.value)}} defaultValue={loanAmount}/>
      </div>
      <div>
        <label>Closing Cost: </label>
        <input type="integer" onInput={(e) => {console.log(e.target.value)}} defaultValue={closingCost}/>
      </div>
      <div>
        <label>Years: </label>
        <select className="loan-program">
          <option value="30-year-fixed">30 year fixed</option>
          <option value="15-year-fixed">15 year fixed</option>
        </select>
      </div>
      <div>
        <label>Interest Rate: </label>
        <input type="integer" onInput={(e) => {console.log(e.target.value)}} defaultValue={3.15}/>
      </div>
      <div>
        <button onClick={() => {handlePropertyRevenueExpensesCollapse()}}>Apply Changes</button>
      </div>
    </>
  )
}
