import {useNavigate } from 'react-router-dom';
import React, { useState } from 'react';



// Your component code here


export function SearchBar()
{

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    
  // fetching products from the database
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
          <i className='fa fa-search icon' onClick={searchItem}/>
          
        </section>
      </section>
    </>
  )
}