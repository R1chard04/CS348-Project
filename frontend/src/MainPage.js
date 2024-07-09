import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import Table from './Components/Table';
import ListBar from './Components/ListBar';

const nutritionSearchValToEndpoint = {
    id: 'getmacrosbyid', 
    recipe_name: 'getrecipebyname',
};

const basicSearchValToEndpoint = {
    id: 'getrecipe',
    recipe_name: 'getrecipebyname',
};

const MainPage = () => {
    const [message, setMessage] = useState('');
    const [recipe, setRecipe] = useState([]);
    const [searchOption, setSearchOption] = useState('Basic Search');
    const [ingredients, setIngredients] = useState([]);

    const handleClick = (val) => {
        setSearchOption(val);
    };

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
            </select>
            {searchOption === 'Basic Search' && <SearchBar setRecipe={setRecipe} valToEndpoint={basicSearchValToEndpoint} />}
            {searchOption === 'Advanced Search' && <ListBar itemList={ingredients} setRecipe={setRecipe} />}
            {searchOption === 'Nutrition Search' && <SearchBar setRecipe={setRecipe} valToEndpoint={nutritionSearchValToEndpoint} />}

            {recipe.length > 0 && searchOption === 'Basic Search' && <Table rows={recipe} tableType="recipe" />}
            {recipe.length > 0 && searchOption === 'Advanced Search' && <Table rows={recipe} tableType="recipe" />}
            {recipe.length > 0 && searchOption === 'Nutrition Search' && <Table rows={recipe} tableType="nutrition" />}
        </div>
    );
};

export default MainPage;
