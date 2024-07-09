import React, { useState, useEffect } from 'react';

// CSS
import './Table.css';

// Array of keys for each table type
const recipeKeysMap = {
    "id": "int", 
    "recipe_name": "varchar", 
    "description": "varchar",
    "ingredients": "array", 
    "serving_size": "int", 
    "servings": "int", 
    "steps": "varchar"
};
const nutritionKeysMap = {
    "recipe_id": "int", 
    "recipe_name": "varchar", 
    "calories": "float", 
    "total_protein": "float", 
    "total_carbs": "float", 
    "total_fat": "float",
};
const priceKeysMap = {
    "food_name": "varchar", 
    "food_quantity": "int", 
    "food_metric": "int", 
    "price": "float"
};

const ingredientKeysMap = {
    "id": "int", 
    "recipe_name": "varchar", 
    "count": "int",
}


const PAGINATION_SIZE = 5;


const Table = ({ rows, tableType }) => {
    const [index, setIndex] = useState(0);

    const useMap = tableType === "recipe" ? recipeKeysMap : tableType === "nutrition" ? nutritionKeysMap : tableType === "ingredients" ? ingredientKeysMap : priceKeysMap;

    console.log('rows:', rows);

    return (
        <div className="table-root-container">
            <h2>{`${rows.length} result${rows.length !== 1 ? 's' : ''} found...`}</h2>
            <table className="table-container">
                <thead className="table-header">
                    <tr className="table-header-row">
                        {Object.keys(useMap).map((key, index) => (
                            <th className="table-header-data" key={index}>
                                {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-body">
                    {rows.length && rows.slice(index, index + PAGINATION_SIZE).map((row, rowIndex) => (
                        <tr className={`table-body-row ${rowIndex % 2 === 0 ? 'even' : 'odd'}`} key={rowIndex}>
                            {Object.keys(useMap).map((key, cellIndex) => (
                                <td className="table-body-data" key={cellIndex}>
                                    {useMap[key] !== "array" ? row[cellIndex] : row[cellIndex] + ","}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    className="table-button"
                    onClick={() => setIndex(index+1 > PAGINATION_SIZE ? index - PAGINATION_SIZE : index)}
                >
                    Last Page
                </button>
                ({Math.floor(index / PAGINATION_SIZE) + 1}/{Math.ceil(rows.length / PAGINATION_SIZE)})
                <button
                    className="table-button"
                    onClick={() => setIndex(index + PAGINATION_SIZE < rows.length ? index + PAGINATION_SIZE : index)}
                >
                    Next Page
                </button>
            </div>
            
        </div>
    );
}

export default Table;