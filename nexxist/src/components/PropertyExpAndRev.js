import React, { useContext } from 'react'
import PropertyERClosed from './PropertyERClosed.js'
import PropertyEREdit from './PropertyEREdit.js'
import { PropertyContext } from './App.js'

export default function PropertyExpAndRev(props) {
  const {
    property
  } = props;

  const { propertyRevenueExpensesSelected } = useContext(PropertyContext)
  const { handlePropertyRevenueExpensesEdit } = useContext(PropertyContext)
  const { selectedPropertyId } = useContext(PropertyContext)

  return (
    <div className="property-expenses-and-revenue-container">
      {
        propertyRevenueExpensesSelected && property.id == selectedPropertyId ? <PropertyEREdit property={property}/> : <PropertyERClosed property={property}/>
      }
    </div>
  )
}
