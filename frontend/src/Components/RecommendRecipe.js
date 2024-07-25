import React from 'react'
import {useState, useEffect} from 'react';
import Table from './Table';

import './RecommendRecipe.css';

const RecommendRecipe = () => {
    const [bmi, setBmi] = useState(0)
    const [recipeIdList, setRecipeIdList] = useState([]);
    const getRecipes = () => {
        const grabRecipes = async () => {
            await fetch(`http://127.0.0.1:5000/getrecommendedrecipes/${encodeURIComponent(bmi)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.msg);
                setRecipeIdList(data.msg);
            })
            .catch(error => console.error(error));   
        }
        grabRecipes(); 
    }

    return (
        <div>
            <div>BMI</div>
            <div className="search-bar">
                <input
                    type="number"
                    placeholder="Enter your bmi"
                    value={bmi}
                    onChange={(e) => setBmi(e.target.value)}
                />
                <button className="recommended-recipe-button" onClick = {() => { getRecipes(); }}>
                    Get Recommended Recipes
                </button>
            </div>
            {recipeIdList.length > 0 && <Table rows={recipeIdList} tableType="recommended"></Table>}
        </div>
    )
    }

export default RecommendRecipe