import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Header } from './App';
import { SearchBar } from "./App"
import { AdsBar } from './App';
import { FeaturedProducts } from './App';
import { Categories } from './App';
import { MoreOptions } from './App';
import { Footer } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <SearchBar />
    <AdsBar />
    <FeaturedProducts />
    <Categories />
    <MoreOptions />
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
