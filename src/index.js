import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Header } from './pages/home2';
import { SearchBar } from "./pages/home2"
import { AdsBar } from './pages/home2';
import { FeaturedProducts } from './pages/home2';
import { Categories } from './pages/home2';
import { MoreOptions } from './pages/home2';
import { Footer } from './pages/home2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    {/* <SearchBar /> */}
    <AdsBar />
    {/* <FeaturedProducts />
    <Categories /> 
     <MoreOptions /> */}
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
