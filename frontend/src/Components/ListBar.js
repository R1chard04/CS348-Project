import React, {useState, useEffect} from 'react'
import './SearchBar.css';
import './ListBar.css';

const ListBar = ({itemList, setRecipe}) => {
    // searchbar should check if the item is matching in the list
    const allItems = JSON.parse(JSON.stringify(itemList)).flat();
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(itemList);
    const [ingredients  , setIngredients] = useState([]);
    // console.log(allItems);

    const ListBarItem = ({itemName, id}) => {
        const removeSelf = () => {
            let newList = [...ingredients]; // Create a new array reference
            const idx = newList.indexOf(itemName);
            if (idx > -1) {
                newList.splice(idx, 1);
                setIngredients(newList); // Update state with the new array reference
            }
        };
        return (
            <div className = "itemDiv" id = {id}>
                {itemName}
                <button onClick = {() => removeSelf()}>X</button>
            </div>
        );
    }
 
    const findRecipesWithIngredient = (ingredients) => {
        console.log('Finding recipes with ingredients: ', ingredients.join(','))
        fetch(`http://127.0.0.1:5000/getrecipesbyingredients/${ingredients.join(',')}`, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                }
            }).then(response => response.json())
                .then(data => { console.log(data.msg); setRecipe(data.msg);})
                .catch(error => console.error(error));
      }
    
    // Example usage:
    // findRecipesWithIngredient(['egg', 'bacon', 'romaine lettuce', 'spaghetti']);

    useEffect(() => {
        if(search === '') {
            setFilteredItems([]);
        } else {
            //stylistic choice
            setFilteredItems(allItems.filter(item => item.toLowerCase().includes(search.toLowerCase())));
            if(filteredItems.length === 1 && filteredItems[0].toLowerCase() === search.toLowerCase()) {
                setFilteredItems([]);
            }
        }
        
    }, [search]);

    useEffect (() => {
        
    }, [filteredItems])
    
    const onAdd = (addItem) => {
        setIngredients(ingredients => [...ingredients, addItem]);
        setSearch('');
        console.log(ingredients);
    }

    const onSearch = () => {
        findRecipesWithIngredient(ingredients);
    }

    return (
        <div className = "search-bar-container">
           <div className="search-bar">
                <input 
                    type="text" 
                    placeholder={`Add ingredients`}
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <button onClick = {() => onAdd(search)}>Add</button> 
                <button onClick = {() => onSearch()}>Search</button> 
            </div>
            <div className = "dropdown"> 
                {filteredItems.map((item) => {
                    return (<button className = "dropdown-row" onClick = {() => setSearch(item)}>{item}</button>)
                })}
            </div> 

            <div className = "itemSection">
                {ingredients.map((item, index) => {
                    return (<ListBarItem itemName = {item} id = {index}/>)
                })}
            </div>
        </div>


    );
};

export default ListBar;