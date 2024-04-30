import logo from "../assets/Malume'zLogoFullNoBackground.png";
import './home.css';
import { Router, useNavigate } from 'react-router-dom';

export function Header() {
  // const loginPage = () => {
  const navigate = useNavigate();
  
  // }
  return (
    <>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </head>
    <body>
      <header className="homeHeader">
        <img src={logo} alt="Malume'z Logo" height = "60" width="auto"/>
        <section>
          <i className='fa fa-question-circle icon'/>
          <i className='fa fa-shopping-basket icon'/>
          <i onClick={() => navigate('/login')} className='fa fa-user-circle icon'/>
        </section>
      </header>
    </body>
    </>
  );
}

export function SearchBar()
{
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

export function AdsBar()
{
  let adImage=require("../assets/Malume'zLogoFull.png");
  return (
    <>
      <section className="adsBar">
        <i className="fa fa-chevron-left icon left"></i>
        <img className="adsImage" src={adImage} alt="Image of an Ad"></img>
        <i className="fa fa-chevron-right icon right"></i>
      </section>
    </>
  )
}

export function FeaturedProducts()
{
  let brandImage=require("../assets/Malume'zLogoFull.png");

  return (
    <>
      <section  className="featuredProducts">
        <i className="fa fa-chevron-left icon left"></i>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <i className="fa fa-chevron-right icon right"></i>
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
          <i className="fa fa-at icon"></i>
            <a href="mailto:malumez@gmail.com">
              malumez@gmail.com
            </a>
            </li>
          <li>
          <i className="fa fa-phone icon"></i>
            <a href="tel:malumez@gmail.com">
              011 625 8639
            </a>
            </li>
          <li>
          <i className="fa fa-instagram icon"></i>
            <a href="https://www.instagram.com/malumez/">
              @malumez
            </a>
            </li>
          <li>
          <i className="fa fa-facebook icon"></i>
            <a href="https://www.facebook.com/malumez/">
              @malumez
            </a>
            </li>
          <li>
          <i className="fa fa-twitter icon"></i>
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
          <i className="fa fa-seacrh icon"></i>
            <a href="">
              Find a store
            </a>
            </li>
          <li>
          <i className="fa fa-money icon"></i>
            <a href="">
              Become a seller
            </a>
            </li>
          <li>
          <i className="fa fa-phone icon"></i>
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
          <i className="fa fa-user icon"></i>
            <a href="">
              Manage my account
            </a>
            </li>
          <li>
          <i className="fa fa-truck icon"></i>
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
          <i className="fa fa-question-circle icon"></i>
            <a href="">
              FAQ
            </a>
            </li>
          <li>
          <i className="fa fa-question-circle icon"></i>
            <a href="">
              Support
            </a>
            </li>
          <li>
          <i className="fa fa-flag icon"></i>
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