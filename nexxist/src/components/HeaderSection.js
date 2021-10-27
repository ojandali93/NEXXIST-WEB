import React from 'react'
import Header from './Header.js'
import SearchBar from './SearchBar.js'
import FilterAndSort from './FilterAndSort.js'


export default function HeaderSection(props) {
  return (
    <>
      <div>
        <Header/>  
      </div>  
      <div>
        <SearchBar/>  
      </div>  
      <div>
        <FilterAndSort/>  
      </div>   
    </>
  )
}
