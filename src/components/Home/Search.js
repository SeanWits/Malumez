import {useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export function SearchBar()
{

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

  // navigating to the products page and passing the value in the search 
  function searchItem()
  {
    console.log(search);
    navigate('/products', {state:search});
  }

  return (
    <>
      <section className="searchBar">
          <i className='fa fa-bars icon'/>
        <section className="search">
          <input className="inputSearch" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search.." id="searchInput"/>
          <i className='fa fa-search icon' id = "searchButton" onClick={searchItem}/>
          
        </section>
      </section>
    </>
  )
}