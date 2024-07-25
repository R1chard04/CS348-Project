import React, { useState, useEffect } from 'react';

// CSS
import './SearchBar.css';
// const valToEndpoint = {
//     id: 'getmacrosbyid', 
//     recipe_name: 'getrecipebyname',
// }

const SearchBar = ({ setRecipe, valToEndpoint }) => {
    const [search, setSearch] = useState('');
    const [val, setVal] = useState('id');
    const [err, setErr] = useState('');

    useEffect(() => {
        if (search === '') {
            setRecipe([]);
        }
    }, [search]);
    
    const handleClick = async () => {
        let encodedSearch = encodeURIComponent(search);
        console.log(val, valToEndpoint);
        if (valToEndpoint[val] === "getpricebyid") {
            await fetch(`http://127.0.0.1:5000/${valToEndpoint[val]}/${encodedSearch}`).then(response => response.json())
                .then(data => {console.log(data); setRecipe(data.msg); setErr(data.error); })
                .catch(error => console.error(error));
        } else {
            await fetch(`http://127.0.0.1:5000/${valToEndpoint[val]}/${encodedSearch}`).then(response => response.json())
                .then(data => {console.log(data); setRecipe(data.msg); setErr(data.error); })
                .catch(error => console.error(error));
        }
    };


    return (
        <div className="search-bar-container">
            {valToEndpoint[val] === 'getleastexpensive' || valToEndpoint[val] === 'getmostprotein' ? <button onClick={handleClick}>Search</button> :
            <>
                {valToEndpoint[val] === 'getrecipe' &&
                    <div id="dropdown-box">
                        <select id="dropdown" value={val} onChange={e => setVal(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="id">Recipe id</option>
                            <option value="recipe_name">Recipe name</option>
                        </select>
                    </div>
                }

                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder={`Search by ${val}`}
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <button onClick={handleClick}>Search</button>
                    <p>{err && err}</p>
                </div>
            </>
            }
        </div>
    );
}

export default SearchBar;