import React, { useState, useEffect } from 'react';
import './App.css';

// Components
// import Navbar from './Components/Navbar';
import SearchBar from './Components/SearchBar';
import Table from './Components/Table';

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
    <div className="App">
      <h1>Recipe Search</h1>
      <SearchBar setRecipe={setRecipe} />
      {recipe.length > 0 && <Table rows={recipe} tableType="recipe" />}
    </div>
  );
}

export default App;
