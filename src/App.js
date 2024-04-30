import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signUp';
// import Admin from './pages/admin';
// import ShowProducts from './components/showProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        {/* <Route path="/admin" element={<Admin/>}/> */}
        {/* <Route path="/showProducts" element={<ShowProducts/>}/> */}
      </Routes>
    </Router>
  );
}

//Wassup

export default App;
