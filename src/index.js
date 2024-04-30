import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { Header } from './pages/home';
import { SearchBar } from "./pages/home"
import { AdsBar } from './pages/home';
import { FeaturedProducts } from './pages/home';
import { Categories } from './pages/home';
import { MoreOptions } from './pages/home';
import { Footer } from './pages/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
