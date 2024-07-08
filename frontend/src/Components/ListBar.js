import React, {useState, useEffect} from 'react'
import './SearchBar.css';
import './ListBar.css';

const ListBar = ({itemList}) => {
    // searchbar should check if the item is matching in the list
    const allItems = itemList; 
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(itemList);

    useEffect(() => {
        if(search === '') {
            setFilteredItems(allItems);
        } else {
            setFilteredItems(allItems.filter(item => item.toLowerCase().includes(search.toLowerCase())));
        }
        
    }, [search])

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


    )
}

export default ListBar