import React, { useContext } from 'react'
import { PropertyContext } from './App.js'
import PropertyImage from './PropertyImage.js'
import PropertyDetail from './PropertyDetails.js'
import PropertyExpAndRev from './PropertyExpAndRev.js'
import PropertyRevenue from './PropertyRevenue.js'
import PropertyMetricsSummary from './PropertyMetricsSummary.js'

export default function PropertyList() {
  const { propertyList } = useContext(PropertyContext)
  return (
    <div>
      {
        propertyList.map(property => {
          let keyId = property['zpid']
          return (
            <div key={keyId} className="property-container">
              <PropertyImage image={property.imgSrc}/>
              <PropertyDetail property={property}/>
              <PropertyExpAndRev property={property}/>
              {/* <PropertyRevenue property={property}/>
              <PropertyMetricsSummary property={property}/> */}
            </div>
          )
        })
      }
    </div>
  )
}
