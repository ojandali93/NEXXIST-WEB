import React from 'react'

export default function FilterAndSort() {
  return (
    <div className="filter-and-sort-container">
      <div>
        <p>
          Filter
        </p>
      </div>
      <div>
        <label>
          Sort:
        </label>
        <select className="sort-options">
          <option value="price-high-low">Price(High to Low)</option>
          <option value="price-low-high">Price(Low to High)</option>
          <option value="newest">Newest</option>
          <option value="bedrooms">Bedrooms</option>
          <option value="bathrooms">Bathrooms</option>
          <option value="sqft.">Sqft.</option>
        </select>
      </div>
    </div>
  )
}
