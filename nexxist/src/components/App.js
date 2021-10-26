import React, { useState } from 'react';
import HeaderMobile from './Header.js';
import '../css/app.css';

export const HeaderContext = React.createContext()

export default function App() {
  const [searchSelected, setSearchSelected] = useState(false)
  const [address, setAddress] = useState('')

  const handleSelectedAddress = async () => {
    console.log('selectedAddress')
  }

  const headerContextValue = {
    handleSearchSelectedOn,
    handleSearchSelectedOff,
    handleAddressChange,
    handleSelectedAddress
  }

  function handleSearchSelectedOn(){
    setSearchSelected(true)
  }

  function handleSearchSelectedOff(){
    setSearchSelected(false)
  }

  function handleAddressChange(e){
    console.log(e)
    // setSearchedAddress(e)
  }

  return (
    <div>
      <HeaderContext.Provider value={headerContextValue}>
        <HeaderMobile searchSelected={searchSelected} address={address} setAddress={setAddress}/>
      </HeaderContext.Provider>
    </div>
  )
}
