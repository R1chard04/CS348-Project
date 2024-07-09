import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

// Components
import MainPage from './MainPage';
import Navbar from './Components/Navbar';

const App = () => {
  const [message, setMessage] = useState('');
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/', {
      headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      }
    }).then(response => response.json())
      .then(data => {console.log(data.msg); setRecipe(data.msg);})
      .catch(error => console.error(error));
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="navbar-container">
          <Navbar className="app-navbar"/>
        </div>
        <h1>Recipe Search</h1>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/advanced-search" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
