import React from 'react'

export default function PropertyDetails({ property }) {
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
            property.lotAreaUnit == 'acres' ? " " + property.lotAreaValue.toFixed(2) + " acres" : " " + property.lotAreaValue + " sqft."
          }
        </p>
      </div>
      <p>{property.address}</p>
      <div className="detail-container-flex">
        <p>Days Listed: {property.daysOnZillow}</p>
        <p>MLS #: {property.mlsid}</p>
      </div>
      <div className="detail-container-flex">
        <p>Agent: {property.listingAgent}</p>
        <p>Broker: {property.brokerageName}</p>
      </div>
    </div>
  )
}
