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
    "nutrition_name": "varchar", 
    "protein": "float", 
    "carb": "float", 
    "fat": "float", 
    "sugar": "float", 
    "sodium": "float", 
    "vitamin_d": "float", 
    "vitamin_e": "float"
};
const priceKeysMap = {
    "food_name": "varchar", 
    "food_quantity": "int", 
    "food_metric": "int", 
    "price": "float"
};

const PAGINATION_SIZE = 3;


const Table = ({ rows, tableType }) => {
    const [index, setIndex] = useState(0);

    const useMap = tableType === "recipe" ? recipeKeysMap : tableType === "nutrition" ? nutritionKeysMap : priceKeysMap;


    return (
        <div className="table-root-container">
            <h2>{`${rows.length} results found...`}</h2>
            <table className="table-container">
                <thead className="table-header">
                    <tr className="table-header-row">
                        {Object.keys(useMap).map((key, index) => (
                            <th className="table-header-data" key={index}>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-body">
                    {rows.slice(index, index + PAGINATION_SIZE).map((row, index) => (
                        <tr className="table-body-row" key={index}>
                            {Object.keys(useMap).map((key, index) => (
                                <td className="table-body-data" key={index}>
                                    {useMap[key] != "array" ? row[index] : row[index]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {index + PAGINATION_SIZE < rows.length && 
                <button
                    className="table-button"
                    onClick={() => setIndex(index + PAGINATION_SIZE)}
                >
                    Next Page ({Math.floor(index / PAGINATION_SIZE)}/{Math.ceil(rows.length / PAGINATION_SIZE)})
                </button>
            }
        </div>
    );
}

export default Table;