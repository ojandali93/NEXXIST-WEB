import React from 'react'
import logo from '../images/nexxist.png'
import search from '../images/loupe.png'
import like from '../images/like.png'
import user from '../images/user.png'

export default function Header() {
  return (
    <div className="header-container container-section">
      {/* <p>hellow world</p> */}
      <img className="logo" alt="Nexxist Logo" src={logo}/>
      <div>
        <img className="header-image" alt="Search Image" src={search}/>
        <img className="header-image" alt="Like Image" src={like}/>
        <img className="header-image" alt="User Image" src={user}/>
      </div>
    </div>
  )
}
