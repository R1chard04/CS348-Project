import React, { useState } from 'react';
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
};

const expandedKeysMap = {
    "id": "int",  
    "description": "varchar",
    "recipe_name": "varchar",
    "steps": "varchar",
    "serving_size": "int", 
    "servings": "int", 
    "calories": "int", 
    "protein": "int", 
    "carbs": "int", 
    "fat": "int", 
};


const PAGINATION_SIZE = 5;


const Table = ({ rows, tableType }) => {
    const [index, setIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [expandedValues, setExpandedValues] = useState(null);

    const useMap = tableType === "recipe" ? recipeKeysMap : tableType === "nutrition" ? nutritionKeysMap : tableType === "ingredients" ? ingredientKeysMap : priceKeysMap;

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
        getExpandedValues(row[0]);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
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
                        {Object.keys(useMap).map((key, index) => (
                            <th className="table-header-data" key={index}>
                                {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                            </th>
                        ))}
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
                        <table>
                            <tbody>
                                {Object.keys(expandedKeysMap).map((key, index) => (
                                    <tr className='modal-row' key={index}>
                                        <td><b>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</b></td>
                                        <td>{expandedValues && (key !== "steps" ? (expandedKeysMap[key] == 'int' && index !== 0 ? expandedValues[index].toFixed(2) : expandedValues[index]) : expandedValues[index].slice(0, 60).replace('[', '').replace('\'', '').replace('\', \'', ' ') + "...")}</td>
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
