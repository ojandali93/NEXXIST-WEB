import React from 'react'

export default function PropertyDetails({ property }) {
  return (
    <>
      <div >
        <p>{property.price}</p>
        <p>{property.status}</p>
      </div>
      <div >
        <p>Beds: {property.beds}</p>
        <p>Baths: {property.baths}</p>
        <p>Sqft: {property.sqft}</p>
      </div>
      <p>{property.address}</p>
      <div >
        <p>{property.days_listed}</p>
        <p>{property.mls}</p>
      </div>
      <div >
        <p>{property.agent}</p>
        <p>{property.broker}</p>
      </div>
    </>
  )
}
