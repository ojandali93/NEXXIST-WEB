import React from 'react'

export default function PropertyImage({ image }) {
  console.log(image)
  return (
    <div>
      <img className="property-image" src={image}/>
    </div>
  )
}
