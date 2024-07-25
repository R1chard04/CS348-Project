import React, { useState, useEffect } from 'react';
import Table from './Table.js';

const SavedRecipes = ({ recipes, setSavedRecipe }) => {
    const [recipeList, setRecipeList] = useState([]);
    const [_, forceUpdate] = useState(0);

    useEffect(() => {
        async function fetchRecipeInfo() {
            const newRecipes = [];

            for (const recipeId of recipes) {
                await fetch(`http://127.0.0.1:5000/getrecipe/${encodeURIComponent(recipeId)}`)
                .then(response => response.json())
                .then(data => {
                    newRecipes.push(data.msg[0]); // Collect all new recipes in an array
                })
                .catch(error => console.error(error));
            }
        }

        fetchRecipeInfo();
    }, [recipes]);

    return (
        <div>
            <Table rows={recipeList} tableType="savedrecipes" setSavedRecipe={setSavedRecipe} forceUpdate={forceUpdate}></Table>
        </div>
    );
}

export default SavedRecipes;
