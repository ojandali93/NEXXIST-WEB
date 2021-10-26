import React from 'react';


export default function SearchBar({ handleAddressChange }) {
  return (
    <div>
      <input className="search-bar" placeholder="Search Places... " onChange={(e) => {handleAddressChange(e.target.value)}} type="text"/>
    </div>
  )
}
