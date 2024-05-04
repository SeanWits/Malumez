// import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Admin from './pages/admin';
import ShowProducts from './components/showProducts';
import Products from './pages/products';
import Checkout from './pages/Checkout';
import StoreImageTextFirebase from './pages/uploadImg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/showProducts" element={<ShowProducts/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/checkOut" element={<Checkout/>}/>
        <Route path="/uploadImg" element={<StoreImageTextFirebase/>}/>
      </Routes>
    </Router>
  );
}

//Wassup

export default App;
