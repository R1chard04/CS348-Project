import React, { useState, useEffect } from 'react';

import SearchBar from './Components/SearchBar';
import Table from './Components/Table';
import ListBar from './Components/ListBar';

const MainPage = () => {
    const [message, setMessage] = useState('');
    const [recipe, setRecipe] = useState([]);
    const [searchOption, setSearchOption] = useState("Basic Search");
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
            .then(data => {console.log(data.msg); setRecipe(data.msg);})
            .catch(error => console.error(error));
        
        if (!ingredients.length) {
            fetch('http://127.0.0.1:5000/getallingredients/', {
                headers: {
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                }
            }).then(response => response.json())
                .then(data => {console.log(data.msg); setIngredients(data.msg);})
                .catch(error => console.error(error));
        }
    }, [ingredients.length]); // Dependencies

    return (
        <div className="mainpage-container">
            <select id="dropdown" value={searchOption} onChange={e => handleClick(e.target.value)}>
                <option value="Basic Search">Basic Search</option>
                <option value="Advanced Search">Advanced Search</option>
            </select>
            {searchOption === "Advanced Search" && <ListBar itemList={ingredients} setRecipe={setRecipe} /> }
            {searchOption === "Basic Search" &&  <SearchBar setRecipe={setRecipe} /> }
            {recipe.length > 0 && <Table rows={recipe} tableType="recipe" />}
        </div>
    );
};

export default MainPage;
