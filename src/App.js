import logo from "./assets/Malume'zLogoFullNoBackground.png";
import './App.css';

export function Header() {
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
          <i className='fa fa-user-circle icon'/>
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
  let adImage=require("./assets/Malume'zLogoFull.png");
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
  let brandImage=require("./assets/Malume'zLogoFull.png");

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
  let productImage=require("./assets/Malume'zLogoFull.png");
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
      <section className="storeSection"></section>
      <section className="accountSection"></section>
      <section className="helpSection"></section>
    </>
  )
}
//Wassup

