import logo from "../assets/Malume'zLogoFullNoBackground.png";
import './home.css';
import { Router, useNavigate } from 'react-router-dom';
import { Header } from "../components/Header";
import { SearchBar } from "../components/Search";
import { MoreOptions } from "../components/More_Options";
import { Footer } from "../components/Footer";
import { Categories } from "../components/Categories";
import { AdsBar } from "../components/AdsBar";

export function FeaturedProducts()
{
  let brandImage=require("../assets/Malume'zLogoFull.png");

  //fetching brands from the database

  return (
    <>
    
    <h2 id="brandsHeading">Brands</h2>
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