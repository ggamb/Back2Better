import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Nav from './components/Nav';
import Home from './components/Home';
import Green from './components/Green';
import Yellow from './components/Yellow';
import Red from './components/Red';
import Blue from './components/Blue';
import Orange from './components/Orange';
import Silver from './components/Silver';

function App() {
  return (
    <Router>

      <Nav />
      <Routes>
        <Route path='/green' element={<Green/>} />
        <Route path='/yellow' element={<Yellow/>} />
        <Route path='/blue' element={<Blue/>} />
        <Route path='/red' element={<Red/>} />
        <Route path='/orange' element={<Orange/>} />
        <Route path='/silver' element={<Silver/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
