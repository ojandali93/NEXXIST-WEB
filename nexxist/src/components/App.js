import React, { useState } from 'react';
import HeaderSection from './HeaderSection.js';
import PropertyList from './PropertyList.js';
import '../css/app.css';

export const PropertyContext = React.createContext()

export default function App() {
  const mockData = [
    {
      id: 1,
      picture: "../images/2056434.jpeg",
      price: 679800,
      status: 'Active',
      beds: 3,
      baths: 3,
      sqft: 1364,
      living_space: 4364,
      address: '184 Valley View Ter, Mission Viejo, CA 92692',
      days_listed: 114,
      mls: 'OC22353432',
      agent: 'John Doe',
      broker: 'JD Realty',
      hoa: 283,
      property_tax: 125,
      home_insurance: 197,
      rent: 1954,
    },
    {
      id: 2,
      picture: "../images/unnamed.jpeg",
      price: 783000,
      status: 'Pending',
      beds: 3,
      baths: 3,
      sqft: 1939,
      living_space: 3964,
      address: 'Plan 2 Plan, Neo at Mission Foothils',
      days_listed: 29,
      mls: 'OC3628342',
      agent: 'John Doe',
      broker: 'JD Realty',
      hoa: 313,
      property_tax: 208,
      home_insurance: 241,
      rent: 2150,
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
