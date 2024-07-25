import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

import NutrientsChart from './NutrientsChart';

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
};
const nutritionKeysMap = {
    "recipe_id": "int", 
    "recipe_name": "varchar", 
    "calories": "int", 
    "total_protein": "int", 
    "total_carbs": "int", 
    "total_fat": "int",
    "total_sugar": "int",
    "total_vitamin_e": "int",
    "total_vitamin_d": "int",
};
const priceKeysMap = {
    "id": "int", 
    "recipe_name": "varchar", 
    "cost": "int"
};

const ingredientKeysMap = {
    "id": "int", 
    "recipe_name": "varchar", 
    "matched_ingredients": "int",
};

const expensiveKeysMap = {
    "id": "int",
    "recipe_name": "varchar",
    "cost": "int",
};

const proteinKeysMap = {
    "id": "int",
    "recipe_name": "varchar",
    "calories": "float",
    "protein": "float",
    "carbs": "float",
    "fat": "float",
};

const expandedKeysMap = {
    "id": "int",  
    "description": "varchar",
    "recipe_name": "varchar",
    "steps": "varchar",
    "serving_size": "int", 
    "servings": "int", 
    "calories": "float", 
    "protein": "float", 
    "carbs": "float", 
    "fat": "float", 
};

const savedRecipeKeysMap = {
    "id": "int", 
    "recipe_name": "varchar", 
    "description": "varchar",
    "ingredients": "array", 
    "serving_size": "int", 
    "servings": "int", 
    "remove": "button"
};


const PAGINATION_SIZE = 5;


const Table = ({ rows, tableType, setSavedRecipe, forceUpdate }) => {
    const [index, setIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [expandedValues, setExpandedValues] = useState(null);

    const navigate = useNavigate();

    let useMap = null;
    if (tableType === "recipe") useMap = recipeKeysMap;
    else if (tableType === "savedrecipes") useMap = savedRecipeKeysMap;
    else if (tableType === "nutrition") useMap = nutritionKeysMap;
    else if (tableType === "ingredients") useMap = ingredientKeysMap;
    else if (tableType === "price") useMap = priceKeysMap;
    else if (tableType === "expensive") useMap = expensiveKeysMap;
    else if (tableType === "protein") useMap = proteinKeysMap;

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
        getExpandedValues(row[0]);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };

    const deleteSavedRecipe = (id) => {
        console.log('deleting recipe with id: ', id);
        let storedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
        localStorage.removeItem('savedRecipes');
        setSavedRecipe((prevSavedRecipes) => prevSavedRecipes.filter((recipeid) => recipeid !== id));
        // no need to set local storage since that is done in the useEffect hook in App.js
        forceUpdate((prev) => prev + 1);
        if (storedRecipes.length === 1) { navigate('/'); }
    };

    const getExpandedValues = (id) => {
        fetch(`http://127.0.0.1:5000/getgeneralrecipeinfo/${id}`, {
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
            }
        }).then(response => response.json())
            .then(data => { console.log("expanded values: ", data.msg[0]); setExpandedValues(data.msg[0]); })
            .catch(error => console.error(error));
    }

    return (
        <div className="table-root-container">
            <h2>{`${rows.length} result${rows.length !== 1 ? 's' : ''} found...`}</h2>
            <table className="table-container">
                <thead className="table-header">
                    <tr className="table-header-row">
                        {Object.keys(useMap).map((key, index) => 
                            {return useMap[key] !== "button" ? (
                                <th className="table-header-data" key={index}>
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                </th>
                            ) : (
                                <th className="table-header-data" key={index}></th>
                            )}
                        )}
                    </tr>
                </thead>
                <tbody className="table-body">
                    {rows.length && rows.slice(index, index + PAGINATION_SIZE).map((row, rowIndex) => (
                        <tr 
                            className="table-body-row" 
                            key={rowIndex}
                            onClick={() => handleRowClick(row)}
                            style={{ backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : '#fff' }}
                        >
                            {Object.keys(useMap).map((key, cellIndex) => { return useMap[key] !== "button" ? (
                                <td className="table-body-data" key={cellIndex}>
                                    {useMap[key] !== "array" ? (useMap[key] === "float" ? Number(row[cellIndex]).toFixed(2) : row[cellIndex]) : row[cellIndex] + ","}
                                </td>
                            ) : (
                                <td className="table-body-data" key={cellIndex}>
                                    <button
                                        className="table-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteSavedRecipe(row[0]);
                                        }}
                                    >
                                        X
                                    </button>
                                </td>
                            )})}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    className="table-button"
                    onClick={() => setIndex(index + 1 > PAGINATION_SIZE ? index - PAGINATION_SIZE : index)}
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

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Row Details"
                className="modal"
                overlayClassName="modal-overlay"
                appElement={document.getElementById('root')}
            >
                {selectedRow && (
                    <div>
                        <div className='modal-header'>
                            <h2>Recipe Details</h2>
                            <button onClick={closeModal}>X</button>
                        </div>
                        <button
                            className='modal-save-button'
                            onClick={() => {
                                setSavedRecipe(prevSavedRecipes => [...prevSavedRecipes, selectedRow[0]]);
                                closeModal();
                            }}
                        >
                            Save Recipe
                        </button>
                        <table>
                            <tbody>
                                {Object.keys(expandedKeysMap).map((key, index) => (
                                    <tr className='modal-row' key={index}>
                                        <td><b>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</b></td>
                                        <td>{expandedValues && (key !== "steps" ? (expandedKeysMap[key] === 'int' && index !== 0 ? expandedValues[index].toFixed(2) : expandedValues[index]) : expandedValues[index].slice(0, 60).replace('[', '').replace('\'', '').replace('\', \'', ' ') + "...")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <NutrientsChart
                            calories={expandedValues && Number(expandedValues[6])}
                            protein={expandedValues && Number(expandedValues[7])}
                            carbs={expandedValues && Number(expandedValues[8])}
                            fat={expandedValues && Number(expandedValues[9])}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Table;
