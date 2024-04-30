import logo from "../assets/Malume'zLogoFullNoBackground.png";
import './home.css';
import { Router, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleQuestion, faBasketShopping,faCircleUser, faBars, } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

export function Header() {
  const navigate = useNavigate();
  return (
    <>
    
      <header className="homeHeader">
        <img src={logo} alt="Malume'z Logo" height = "60" width="auto"/>
        <section>
        {/* The Icons should be contained within buttons */}
        <FontAwesomeIcon icon={faCircleQuestion} />
        <FontAwesomeIcon icon={faBasketShopping} />
        

        <button onClick={() => navigate('/')}><FontAwesomeIcon icon={faCircleUser} /></button>
        </section>
      </header>
    
    </>
  );
}

export function SearchBar()
{
  const navigate = useNavigate();
  function searchButtonClicked()
  {
      let search = document.getElementById("searchText").textContent;
      console.log(search);
      
      // navigate to the products page
      navigate('/');
      
      
  }

  return (
    <>
      <section className="searchBar">
        
      <FontAwesomeIcon icon={faBars} />
       
        <section className="search">
          <input id = "searchText" className="inputSearch" type="text" placeholder="Search.."/>
          {/* Put the icon in a button  */}
          <button onClick={searchButtonClicked}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          
          
        </section>
      </section>
    </>
  )
}

export function AdsBar()
{
  let slideIndex = 1;
  let totalSlides = 3;
  let slideName = "slide"+slideIndex;

  useEffect(() => {
    // Call startingUp function once all images are loaded
    startingUp();
  }, []); 

  function startingUp()
  {
    document.getElementById("slide1").style.display = 'block';
    document.getElementById("slide2").style.display = 'none';
    document.getElementById("slide3").style.display = 'none';
  }
  

  function currentSlide(n)
  {
      // the current slide gets invisible
      let prevSlide = document.getElementById(`${slideName}`);
      console.log("Previous slide:" + slideName);
      slideIndex = slideIndex+n;
      let i;
      
      if(slideIndex>3)
      {
        slideIndex =1;
      }

      if(slideIndex<1)
      {
        slideIndex =totalSlides;
      }
      
      // getting the name of the current slide
      slideName = "slide"+slideIndex;
      let noneSlideName = null;
      let currentSlide = document.getElementById(`${slideName}`);
      console.log("CurrentSlide = "+ slideName);
      currentSlide.style.display = 'block';

      console.log("Starting for loop");
      for (i = 1; i <= totalSlides; i++) {
        if(i != slideIndex )
        {
            noneSlideName = "slide"+i;
            console.log("Looking at " +noneSlideName);
            document.getElementById(`${noneSlideName}`).style.display = 'none';
            console.log("Other Slides Removed");

        }
      }
  }
  
  return (
    <>
    <div className ="slider">
            
            <div className ="slides">

                <img id="slide1" src={require("../assets/Ad1.png")} alt="Ad 1" className="slide"></img>

                <img id="slide2" src={require("../assets/Ad2.png")} alt="Ad 2" className="slide"></img>

                <img id="slide3" src={require("../assets/Ad3.png")} alt="Ad 3" className="slide"></img>
                
                
            </div>
            <button id="adLeftArrow"  onClick={() => currentSlide(-1)}> adLeftArrow</button>
            <button id="adRightArrow" onClick={() => currentSlide(1)}> adRightArrow</button>
         </div>
    
    </>
  );
}

export function FeaturedProducts()
{
  let brandImage=require("../assets/Malume'zLogoFull.png");
  let slideIndex = 1;
  let totalSlides = 3;
  let slideName = "productsSlide"+slideIndex;

  useEffect(() => {
    // Call startingUp function once all images are loaded
    startingUp();
  }, []); 

  function startingUp()
  {
    document.getElementById("productsSlide1").style.display = 'block';
    document.getElementById("productsSlide2").style.display = 'none';
    document.getElementById("productsSlide3").style.display = 'none';
  }
  

  function currentSlide(n)
  {
      // the current slide gets invisible
      let prevSlide = document.getElementById(`${slideName}`);
      console.log("Previous slide:" + slideName);
      slideIndex = slideIndex+n;
      let i;
      
      if(slideIndex>3)
      {
        slideIndex =1;
      }

      if(slideIndex<1)
      {
        slideIndex =totalSlides;
      }
      
      // getting the name of the current slide
      slideName = "productsSlide"+slideIndex;
      let noneSlideName = null;
      let currentSlide = document.getElementById(`${slideName}`);
      console.log("CurrentSlide = "+ slideName);
      currentSlide.style.display = 'block';

      console.log("Starting for loop");
      for (i = 1; i <= totalSlides; i++) {
        if(i != slideIndex )
        {
            noneSlideName = "productsSlide"+i;
            console.log("Looking at " +noneSlideName);
            document.getElementById(`${noneSlideName}`).style.display = 'none';
            console.log("Other Slides Removed");

        }
      }
  }

  return (
    <>
     <h2>Brands</h2>
      <section  className="featuredProducts">

        <div className ="slides">

          <section id = "productsSlide1" className="slide">
                <img src={require("../assets/SunlightLogo.png")} alt="Brand1"></img>
                <img src={require("../assets/SunlightLogo.png")} alt="Brand2"></img>
                <img src={require("../assets/SunlightLogo.png")} alt="Brand3"></img> 
          </section>

          <section id = "productsSlide2" classname="slide">
                <img src={require("../assets/TasticLogo.png")} alt="Brand1"></img>
                <img src={require("../assets/TasticLogo.png")} alt="Brand2"></img>
                <img src={require("../assets/TasticLogo.png")} alt="Brand3"></img> 
          </section>

          <section id = "productsSlide3" classname="slide">
                <img src={require("../assets/SimbaLogo.png")} alt="Brand1"></img>
                <img src={require("../assets/SimbaLogo.png")} alt="Brand2"></img>
                <img src={require("../assets/SimbaLogo.png")} alt="Brand3"></img> 
          </section>    
            </div>
            <button id="productLeftArrow"  onClick={() => currentSlide(-1)}> productLeft</button>
            <button id="productRightArrow" onClick={() => currentSlide(1)}> productRight</button>
      </section>
    </>
  )
}

export function Categories()
{
  let productImage=require("../assets/Malume'zLogoFull.png");
  let categoryName = "Category"
  return (
    <>
      <section className="categorySection">
        <section className="categoryText">
          <h2 className="categoryHeading">
            {categoryName}
          </h2>
          <a className="viewMoreLink" href="">
            View more
          </a>
        </section>
        <section className="productSection">
          <img className="productImage" src={productImage} alt="Image of product" />
          <img className="productImage" src={productImage} alt="Image of product" />
          <img className="productImage" src={productImage} alt="Image of product" />
        </section>
      </section>
    </>
  )
  
}

export function MoreOptions()
{
  return (
    <>
    <section className="moreOptions">
      <section className="contactSection">
        <h3 className="contactUsHeading">
          Contact Us
        </h3>
        <ul className="contactList">
          <li>
          {/* <i className="fa fa-at icon"></i> */}
            <a href="mailto:malumez@gmail.com">
              malumez@gmail.com
            </a>
            </li>
          <li>
          {/* <i className="fa fa-phone icon"></i> */}
            <a href="tel:malumez@gmail.com">
              011 625 8639
            </a>
            </li>
          <li>
          {/* <i className="fa fa-instagram icon"></i> */}
            <a href="https://www.instagram.com/malumez/">
              @malumez
            </a>
            </li>
          <li>
          {/* <i className="fa fa-facebook icon"></i> */}
            <a href="https://www.facebook.com/malumez/">
              @malumez
            </a>
            </li>
          <li>
          {/* <i className="fa fa-twitter icon"></i> */}
            <a href="https://www.twitter.com/malumez/">
              @malumez
            </a>
              </li>
          </ul>
      </section>
      <section className="storeSection">
        <h3 className="storeHeading">
          Stores
        </h3>
        <ul className="storeList">
          <li>
          {/* <i className="fa fa-seacrh icon"></i> */}
            <a href="">
              Find a store
            </a>
            </li>
          <li>
          {/* <i className="fa fa-money icon"></i> */}
            <a href="">
              Become a seller
            </a>
            </li>
          <li>
          {/* <i className="fa fa-phone icon"></i> */}
            <a href="">
              Contact a seller
            </a>
            </li>
          </ul>
      </section>
      <section className="accountSection">
        <h3 className="accountHeading">
          Account
        </h3>
        <ul className="accountList">
          <li>
          {/* <i className="fa fa-user icon"></i> */}
            <a href="">
              Manage my account
            </a>
            </li>
          <li>
          {/* <i className="fa fa-truck icon"></i> */}
            <a href="">
              Track my order
            </a>
            </li>
            </ul>
      </section>
      <section className="helpSection">
        <h3 className="helpHeading">
          Help and support
        </h3>
        <ul className="helpList">
          <li>
          {/* <i className="fa fa-question-circle icon"></i> */}
            <a href="">
              FAQ
            </a>
            </li>
          <li>
          {/* <i className="fa fa-question-circle icon"></i> */}
            <a href="">
              Support
            </a>
            </li>
          <li>
          {/* <i className="fa fa-flag icon"></i> */}
            <a href="">
              Report a seller
            </a>
            </li>
          </ul>
      </section>
    </section>
    </>
  )
}

export function Footer()
{
  return (
    <>
      <footer>
        <p>
          N-Plusses 2024
        </p>
      </footer>
    </>
  )
}
//Wassup

function Home() 
{
  return (
    <>
  <Header />
  <SearchBar />
  <AdsBar />
  <FeaturedProducts />
  <Categories />
  <MoreOptions />
  <Footer />  
    </>
  )
}

export default Home;