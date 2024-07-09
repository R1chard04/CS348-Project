import React, { useState, useEffect } from 'react';
import './ListBar.css';
import './SearchBar.css';

const ListBar = ({ itemList, setRecipe }) => {
    const allItems = JSON.parse(JSON.stringify(itemList)).flat();
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const ListBarItem = ({ itemName, id }) => {
        const removeSelf = () => {
            let newList = [...ingredients]; // Create a new array reference
            const idx = newList.indexOf(itemName);
            if (idx > -1) {
                newList.splice(idx, 1);
                setIngredients(newList); // Update state with the new array reference
            }
        };

        return (
            <div className="itemDiv" id={id}>
                {itemName}
                <button onClick={() => removeSelf()} style = {{ backgroundColor: '#FFCCCB' }}>X</button>
            </div>
        );
    };

    useEffect(() => {
        if (search === '') {
            setFilteredItems([]);
        } else {
            setFilteredItems(allItems.filter(item => item.toLowerCase().includes(search.toLowerCase())));
            if (filteredItems.length === 1 && filteredItems[0].toLowerCase() === search.toLowerCase()) {
                setFilteredItems([]);
            }
        }
    }, [search]);

    const onAdd = (addItem) => {
        setIngredients(ingredients => [...ingredients, addItem]);
        setSearch('');
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Add ingredients"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => onAdd(search)}>Add</button>
            </div>
            <div className="dropdown">
                {filteredItems.map((item, index) => (
                    <button key={index} className="dropdown-row" onClick={() => setSearch(item)}>{item}</button>
                ))}
            </div>

            <div className="itemSection">
                {ingredients.map((item, index) => (
                    <ListBarItem key={index} itemName={item} id={index} />
                ))}
            </div>
        </div>
    );
};

export default ListBar;
