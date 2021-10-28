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
      price: 517887,
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
      hoa: 659,
      property_tax: 0,
      home_insurance: 181,
      rent: 3200,
    },
    {
      id: 2,
      picture: "../images/unnamed.jpeg",
      price: 850000,
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
      hoa: 394,
      property_tax: 489,
      home_insurance: 298,
      rent: 3249,
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
