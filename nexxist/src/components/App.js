import React, { useState } from 'react';
import Header from './Header.js';
import SearchBar from './SearchBar.js';
import '../css/app.css';

export default function App() {
  const [address, setAddress] = useState('')

  function handleAddressChange(e){
    console.log(e)
  }

  return (
    <div>
      <div>
        <Header address={address} setAddress={setAddress}/>
      </div>
      <SearchBar handleAddressChange={handleAddressChange}/>
    </div>
  )
}
