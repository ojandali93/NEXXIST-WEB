import React, { useState } from 'react';
import HeaderSection from './HeaderSection.js';
import SearchBar from './SearchBar.js';
import '../css/app.css';

export default function App() {
  const [address, setAddress] = useState('')
  return (
    <div>
      <div>
        <HeaderSection address={address} setAddress={setAddress}/>
      </div>
    </div>
  )
}
