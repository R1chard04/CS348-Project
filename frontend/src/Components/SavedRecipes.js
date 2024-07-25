import React, { useState, useEffect } from 'react';
import Table from './Table.js';

const SavedRecipes = ({ recipes, setSavedRecipe }) => {
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        async function fetchRecipeInfo() {
            try {
                const response = await fetch('http://127.0.0.1:5000/viewsavedrecipes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipeList(data.msg);
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        }

        fetchRecipeInfo();
    }, [recipes]);

    return (
        <div>
            <Table rows={recipeList} tableType="recipe" setSavedRecipe={setSavedRecipe} />
        </div>
    );
}

export default SavedRecipes;
