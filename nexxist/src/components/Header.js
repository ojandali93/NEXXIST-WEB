import React, { useContext } from 'react'
import logo from '../images/nexxist.png'
import search from '../images/loupe.png'
import like from '../images/like.png'
import user from '../images/user.png'
import { HeaderContext } from './App.js'

export default function HeaderMobile(props) {
  const { handleSearchSelectedOn } = useContext(HeaderContext)
  return (
    <>
      <div className="header-container container-section">
        <img className="logo" alt="Nexxist Logo" src={logo}/>
        <div>
        <img onClick={() => {handleSearchSelectedOn()}} className="header-image" alt="Search" src={search}/>
          <img className="header-image" alt="Like " src={like}/>
          <img className="header-image" alt="User " src={user}/>
        </div>
      </div>
    </>
  )
}
