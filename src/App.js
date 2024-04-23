import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Admin from './pages/admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </Router>
  );
}

//Wassup

export default App;
