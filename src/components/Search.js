import { Router, useNavigate } from 'react-router-dom';
import { db, getDoc, doc } from '../firebase.js';
import React, { useState } from 'react';



// Your component code here


export function SearchBar()
{

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    
  // fetching products from the database
  function searchItem(item)
  {

    console.log(item);
    navigate("/products");


  }

  return (
    <>
      <section className="searchBar">
          <i className='fa fa-bars icon'/>
        
        <section className="search">
          <input className="inputSearch" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search.." id="searchInput"/>
          <i className='fa fa-search icon' onClick={()=> console.log(search)}/>
          
        </section>
      </section>
    </>
  )
}