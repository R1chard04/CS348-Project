import React, {useState, useEffect} from 'react'
import './SearchBar.css';
import './ListBar.css';

const ListBar = ({itemList}) => {
    // searchbar should check if the item is matching in the list
    const allItems = JSON.parse(JSON.stringify(itemList)).flat();
    console.log(allItems,"hihHIhihiHIHIh")
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(itemList);
    const [recipes, setRecipes] = useState([]);

    const findRecipesWithIngredient = (ingredients) => {
        console.log('Finding recipes with ingredients: ', ingredients.join(','))
        fetch(`http://127.0.0.1:5000/getrecipesbyingredients/${ingredients.join(',')}`, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                }
            }).then(response => response.json())
                .then(data => {console.log(data.msg); setRecipes(data.msg);})
                .catch(error => console.error(error));
      }
    
    // Example usage:
    // findRecipesWithIngredient(['egg', 'bacon', 'romaine lettuce', 'spaghetti']);

    useEffect(() => {
        if(search === '') {
            setFilteredItems(allItems);
        } else {
            console.log(allItems);
            setFilteredItems(allItems.filter(item => item.toLowerCase().includes(search.toLowerCase())));
        }
        
    }, [search]);

    useEffect (() => {
        
    }, [filteredItems])
    
    const onAdd = (addItem) => {
        console.log(addItem);
    }

    return (
        <div className = "search-bar-container">
           <div className="search-bar">
                <input 
                    type="text" 
                    placeholder={`Search by monkey`}
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <button onClick = {() => onAdd(search)}>Add</button>
            </div>
            <div className = "dropdown"> 
                {filteredItems.map((item) => {
                    return (<div className = "drowdown-row">{item}</div>)
                })}
            </div> 
        </div>


    );
};

export default ListBar;