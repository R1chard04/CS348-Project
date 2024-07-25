import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

import './App.css';

// Components
import MainPage from './MainPage';
import Navbar from './Components/Navbar';
import BMICalculator from './Components/BMICalculator';
import RecipeAdder from './Components/RecipeAdder';
import SavedRecipes from './Components/SavedRecipes';
import RecommendRecipe from './Components/RecommendRecipe';

const App = () => {
  const [message, setMessage] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState(() => {
    const storedRecipes = localStorage.getItem('savedRecipes');
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/', {
      headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data.msg);
        setRecipe(data.msg);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (savedRecipe.length > 0) {
      console.log("added recipes:", savedRecipe);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipe));
    }
  }, [savedRecipe]);

  const deleteSavedRecipe = (id) => {
    const newSavedRecipe = [...savedRecipe];
    newSavedRecipe.filter((recipe) => recipe.id !== id);
    setSavedRecipe(newSavedRecipe);
  }

  return (
    <Router>
      <div className="App">
        <div className="navbar-container">
          <Navbar className="app-navbar" />
          <button className="saved-recipes-button">
            <NavLink exact to="/saved-recipes" activeClassName="active-link">View saved recipes: {savedRecipe.length}</NavLink>
          </button>
        </div>
        <h1>Recipe Search</h1>
        <Routes>
          <Route path="/" element={<MainPage setSavedRecipe={setSavedRecipe} />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/add-recipe" element={<RecipeAdder />} />
          <Route path="/saved-recipes" element={<SavedRecipes recipes={savedRecipe} setSavedRecipe={setSavedRecipe}/>} />
          <Route path="/recommend-recipes" element={<RecommendRecipe/> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
