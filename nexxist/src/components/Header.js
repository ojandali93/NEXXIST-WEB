import React from 'react'
import logo from '../images/nexxist.png'
import like from '../images/like.png'
import user from '../images/user.png'

export default function Header(props) {
  return (
    <>
      <div className="header-container container-section">
        <img className="logo" alt="Nexxist Logo" src={logo}/>
        <div>
          <img className="header-image" alt="Like " src={like}/>
          <img className="header-image" alt="User " src={user}/>
        </div>
      </div>
    </>
  )
}
