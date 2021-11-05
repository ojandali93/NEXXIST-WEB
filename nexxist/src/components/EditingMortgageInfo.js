import React, { useContext } from 'react'
import { PropertyContext } from './App.js'

export default function EditingMortgageInfo(props) {
  const {
    property
  } = props;

  const { handleHomePriceChange } = useContext(PropertyContext)
  const { calculateDownPayment } = useContext(PropertyContext)
  // const { handleHomePriceChange } = useContext(PropertyContext)
  // const { handleHomePriceChange } = useContext(PropertyContext)
  
  let downPayment = calculateDownPayment(property.price)

  return (
    <>
      <div>
        <label>Home Price:</label>
        <input onInput={(e) => handleHomePriceChange(e.target.value)} type="number" min="0" defaultValue={property.price}/>
      </div>
      <div>
        <label>Down Payment:</label>
        <input type="number" defaultValue={downPayment}/>
        <input max="100" type="number" min="0" step="5" defaultValue={20}/>
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
        <input min="0" type="number" step=".1" defaultValue={property.thirtyYearFixedRate}/>
      </div>
    </>
  )
}
