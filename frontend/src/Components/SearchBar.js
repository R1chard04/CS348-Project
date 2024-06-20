import React, { useState, useEffect } from 'react';
import Link from 'react-router-dom';

// CSS
import './SearchBar.css';

const valToEndpoint = {
    id: 'getrecipe',
    recipe_name: 'getrecipebyname',
}

const SearchBar = ({ setRecipe }) => {
    const [search, setSearch] = useState('');
    const [val, setVal] = useState('id');

    const handleClick = async () => {
        let encodedSearch = encodeURIComponent(search);
        await fetch(`http://127.0.0.1:5000/${valToEndpoint[val]}/${encodedSearch}`).then(response => response.json())
            .then(data => {console.log(data); setRecipe(data.msg);})
            .catch(error => console.error(error));
    }


    return (
        <div className="search-bar-container">
            <div id="dropdown-box">
                <select id="dropdown" value={val} onChange={e => setVal(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="id">Recipe id</option>
                    <option value="recipe_name">Recipe name</option>
                </select>
            </div>

            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder={`Search by ${val}`}
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <button onClick={handleClick}>Search</button>
            </div>
        </div>
    );
}

export default SearchBar;