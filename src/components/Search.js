import { Router, useNavigate } from 'react-router-dom';
import { db, getDoc, doc } from '../firebase.js';
import React, { useState } from 'react';



// Your component code here


export function SearchBar()
{

    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    
    
    
  // fetching products from the database
  function search(item)
  {



  }


  return (
    <>
      <section className="searchBar">
          <i className='fa fa-bars icon'/>
        {/* <button type ="button" id="search_options" className="options_button" /> */}
        <section className="search">
          <input className="inputSearch" type="text" placeholder="Search.."/>
          <i className='fa fa-search icon'/>
          {/* <button type ="button" id="search_options" className="options_button" /> */}
        </section>
      </section>
    </>
  )
}