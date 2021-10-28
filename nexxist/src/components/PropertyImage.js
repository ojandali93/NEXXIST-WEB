import React from 'react'

export default function PropertyImage({ image }) {
  return (
    <div>
      <img className="property-image" src={image}/>
    </div>
  )
}
