import React, { useState } from 'react';
import HeaderSection from './HeaderSection.js';
import PropertyList from './PropertyList.js';
import '../css/app.css';

export const PropertyContext = React.createContext()

export default function App() {
  const mockData = [
    {
      id: 1,
      price: 679800,
      status: 'Active',
      beds: 3,
      baths: 3,
      sqft: 1364,
      address: '184 Valley View Ter, Mission Viejo, CA 92692',
      days_listed: 114,
      mls: 'OC22353432',
      agent: 'John Doe',
      broker: 'JD Realty'
    },
    {
      id: 2,
      price: 783000,
      status: 'Pending',
      beds: 3,
      baths: 3,
      sqft: 1939,
      address: 'Plan 2 Plan, Neo at Mission Foothils',
      days_listed: 29,
      mls: 'OC3628342',
      agent: 'John Doe',
      broker: 'JD Realty'
    }
  ]

  const [address, setAddress] = useState('')
  const [properties, setProperties] = useState(mockData)

  const propertyContextValue = {
    properties,
    setProperties
  }

  return (
    <div>
      <PropertyContext.Provider value={propertyContextValue}>
        <HeaderSection address={address} setAddress={setAddress}/>
        <PropertyList></PropertyList>
      </PropertyContext.Provider>
    </div>
  )
}
