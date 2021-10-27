import React from 'react'

export default function PropertyDetails({ property }) {
  return (
    <div className="property-details-section">
      <div className="detail-container-flex">
        <p>${property.price}</p>
        <p>Status: {property.status}</p>
      </div>
      <div className="detail-container-flex">
        <p>Beds: {property.beds}</p>
        <p>Baths: {property.baths}</p>
        <p>Sqft: {property.sqft}</p>
        <p>Lot: {property.living_space}</p>
      </div>
      <p>{property.address}</p>
      <div className="detail-container-flex">
        <p>Days Listed: {property.days_listed}</p>
        <p>MLS #: {property.mls}</p>
      </div>
      <div className="detail-container-flex">
        <p>Agent: {property.agent}</p>
        <p>Broker: {property.broker}</p>
      </div>
    </div>
  )
}
