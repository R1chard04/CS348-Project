const { useState, useEffect } = require('react');
const { Link } = require('react-router-dom');
const axios = require('axios');

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const tmpLink = "https://www.google.com/";

    useEffect(() => {
        axios.get(tmpLink)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    }, [search]);

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
            />
            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>
                        <Link to={`/search/${result}`}>{result}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;