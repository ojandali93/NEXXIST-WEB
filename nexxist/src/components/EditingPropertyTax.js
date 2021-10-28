import React from 'react'
import { PropertyContext } from './App'

export default function EditingPropertyTax(props) {
  const {
    property
  } = props;

  return (
    <div>
      <p>This estimate is based on the home value, property type, and an estimated local tax rate. Actual rate or taxes assessed may vary.</p>
      <div>
        <p>Home Price</p>
        <p>Tax Rate</p>
      </div>
      <div>
        <p>{property.price} X </p>
        <input type="float"/>
        <p>{property.property_tax * 12}</p>
      </div>
    </div>
  )
}
