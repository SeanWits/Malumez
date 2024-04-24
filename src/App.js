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
        <i className="fa fa-chevron-left icon"></i>
        <img className="adsImage" src={adImage} alt="Image of an Ad"></img>
        <i className="fa fa-chevron-right icon"></i>
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
        <i className="fa fa-chevron-left icon"></i>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <i className="fa fa-chevron-right icon"></i>
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
        <h2 className="categoryHeading">
          {categoryName}
        </h2>
        <section className="productSection">
          <img className="productImage" src={productImage} alt="Image of product" />
          <img className="productImage" src={productImage} alt="Image of product" />
          <img className="productImage" src={productImage} alt="Image of product" />
        </section>
      </section>
    </>
  )

}
//Wassup

