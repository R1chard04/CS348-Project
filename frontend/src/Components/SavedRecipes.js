import React, { useState, useEffect } from 'react';
import Table from './Table.js';

const SavedRecipes = ({ recipes, setSavedRecipe }) => {
    const [recipeList, setRecipeList] = useState([]);
    const [_, forceUpdate] = useState(0);

    useEffect(() => {
        console.log('recipes:');
        async function fetchRecipeInfo() {
            let newRecipes = [];

            for (const recipeId of recipes) {
                await fetch(`http://127.0.0.1:5000/getrecipe/${encodeURIComponent(recipeId)}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log('data:', data);
                        newRecipes.push(data.msg[0]);
                    })
                    .catch(error => console.error(error));
            }
            setRecipeList(newRecipes);
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
