import React from 'react'

export default function PropertyDetails({ property }) {
  let lotArea = parseInt(property.lotAreaValue)
  return (
    <div className="property-details-section">
      <div className="detail-container-flex">
        <p>${property.price}</p>
        <p>Status: {property.listingStatus}</p>
      </div>
      <div className="detail-container-flex">
        <p>Beds: {property.bedrooms}</p>
        <p>Baths: {property.bathrooms}</p>
        <p>Living Size: {property.livingArea} sqft.</p>
        <p>Lot Size: 
          {
            property.lotAreaUnit == 'acres' ? " " + lotArea.toFixed(2) + " acres" : " " + lotArea + " sqft."
          }
        </p>
      </div>
      <p>{property.address}</p>
      <div className="detail-container-flex">
        <p>Days Listed: {property.daysOnZillow}</p>
        <p>MLS #: {property.mls}</p>
      </div>
      <div className="detail-container-flex">
        <p>Agent: {property.agent}</p>
        <p>Broker: {property.broker}</p>
      </div>
    </div>
  )
}
