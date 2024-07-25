import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import Table from './Components/Table';
import ListBar from './Components/ListBar';
import NutritionalFeature from './Components/NutritionalFeature';

const nutritionSearchValToEndpoint = {
    id: 'getmacrosbyid', 
    recipe_name: 'getrecipebyname',
};

const basicSearchValToEndpoint = {
    id: 'getrecipe',
    recipe_name: 'getrecipebyname',
};

const priceSearchValToEndpoint = {
    id: 'getpricebyid',
    recipe_name: 'getrecipebyname',
};

const leastExpensiveSearchValToEndpoint = {
    id: 'getleastexpensive',
    recipe_name: 'getrecipebyname',
};

const mostProteinSearchValToEndpoint = {
    id: 'getmostprotein',
    recipe_name: 'getrecipebyname',
};

const MainPage = ({ setSavedRecipe }) => {
    const [message, setMessage] = useState('');
    const [recipe, setRecipe] = useState([]);
    const [searchOption, setSearchOption] = useState('Basic Search');
    const [ingredients, setIngredients] = useState([]);

    const handleClick = (val) => {
        setSearchOption(val);
    };

    console.log('search option: ', searchOption);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/', {
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
            }
        }).then(response => response.json())
            .then(data => { console.log(data.msg); setRecipe(data.msg); })
            .catch(error => console.error(error));
        
        if (!ingredients.length) {
            fetch('http://127.0.0.1:5000/getallingredients/', {
                headers: {
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                }
            }).then(response => response.json())
                .then(data => { console.log(data.msg); setIngredients(data.msg); })
                .catch(error => console.error(error));
        }
    }, [ingredients.length]);

    return (
        <div className="mainpage-container">
            <select id="dropdown" value={searchOption} onChange={e => handleClick(e.target.value)}>
                <option value="Basic Search">Basic Search</option>
                <option value="Advanced Search">Advanced Search</option>
                <option value="Nutrition Search">Nutrition Search</option>
                <option value="Price Search">Price Search</option>
                <option value="Least Expensive Search">Least Expensive Search</option>
                <option value="Most Protein Search">Most Protein Search</option>
            </select>
            {searchOption === 'Basic Search' && <SearchBar setRecipe={setRecipe} valToEndpoint={basicSearchValToEndpoint} />}
            {searchOption === 'Advanced Search' && <ListBar itemList={ingredients} setRecipe={setRecipe} />}
            {searchOption === 'Nutrition Search' && <SearchBar setRecipe={setRecipe} valToEndpoint={nutritionSearchValToEndpoint} />}
            {searchOption === 'Price Search' && <SearchBar setRecipe={setRecipe} valToEndpoint={priceSearchValToEndpoint} />}
            {searchOption === 'Least Expensive Search' && <SearchBar setRecipe={setRecipe} valToEndpoint={leastExpensiveSearchValToEndpoint} />}
            {searchOption === 'Most Protein Search' && <SearchBar setRecipe={setRecipe} valToEndpoint={mostProteinSearchValToEndpoint} />}

            {recipe.length > 0 && searchOption === 'Basic Search' && <Table rows={recipe} tableType="recipe" setSavedRecipe={setSavedRecipe} />}
            {recipe.length > 0 && searchOption === 'Advanced Search' && <Table rows={recipe} tableType="ingredients" setSavedRecipe={setSavedRecipe} />}
            {recipe.length > 0 && searchOption === 'Nutrition Search' && <Table rows={recipe} tableType="nutrition" setSavedRecipe={setSavedRecipe} />}
            {recipe.length > 0 && searchOption === 'Price Search' && <Table rows={recipe} tableType="price" setSavedRecipe={setSavedRecipe} />}
            {recipe.length > 0 && searchOption === 'Least Expensive Search' && <Table rows={recipe} tableType="expensive" setSavedRecipe={setSavedRecipe} />}
            {recipe.length > 0 && searchOption === 'Most Protein Search' && <Table rows={recipe} tableType="protein" setSavedRecipe={setSavedRecipe} />}
        </div>
    );
};

export default MainPage;
