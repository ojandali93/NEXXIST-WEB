import React, { useContext } from 'react'
import { PropertyContext } from './App.js'

export default function PropertyList() {
  const { properties, setProperties } = useContext(PropertyContext)
  return (
    <div>
      {
        properties.map(property => {
          console.log(property)
          return <p key={property.id}>{property.address}</p>
        })
      }
    </div>
  )
}
