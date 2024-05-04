// import logo from "../assets/Malume'zLogoFullNoBackground.png";
import './home.css';
import React, { useEffect, useState } from 'react';
import { Header } from "../components/Header";
import { SearchBar } from "../components/Search";
import { MoreOptions } from "../components/More_Options";
import { Footer } from "../components/Footer";
import { Categories } from "../components/Categories";
import { AdsBar } from "../components/AdsBar";



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