// import logo from "../assets/Malume'zLogoFullNoBackground.png";
import './home.css';
import React, { useEffect, useState } from 'react';
import { Header } from "../components/Home/Header";
import { SearchBar } from "../components/Home/Search";
import { MoreOptions } from "../components/Home/More_Options";
import { Footer } from "../components/Home/Footer";
import { Categories } from "../components/Home/Categories";
import { AdsBar } from "../components/Home/AdsBar";
import { FeaturedProducts } from '../components/Home/FeaturedProduct';


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