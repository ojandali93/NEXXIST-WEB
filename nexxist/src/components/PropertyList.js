import React, { useContext } from 'react'
import { PropertyContext } from './App.js'
import PropertyImage from './PropertyImage.js'
import PropertyDetail from './PropertyDetails.js'

export default function PropertyList() {
  const { properties, setProperties } = useContext(PropertyContext)
  return (
    <div>
      {
        properties.map(property => {
          console.log(property)
          return (
            <div key={property.id} className="property-container">
              <PropertyImage image={property.picture}/>
              <PropertyDetail property={property}/>
            </div>
          )
        })
      }
    </div>
  )
}
