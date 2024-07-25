import React from 'react';
import {useState, useEffect} from 'react';
import Table from './Table.js';

const SavedRecipes = ({recipes, setSavedRecipe}) => {
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        async function fetchRecipeInfo() {
            const newRecipes = [];

            for(const recipeId of recipes) {
                await fetch(`http://127.0.0.1:5000/getrecipe/${encodeURIComponent(recipeId)}`)
                .then(response => response.json())
                .then(data => {
                    newRecipes.push(data.msg[0]); // Collect all new recipes in an array
                })
                .catch(error => console.error(error));
            }

            setRecipeList([...newRecipes]); // Update state once with all new recipes
        }

        fetchRecipeInfo();
    }, [recipes]); // Adding recipes as a dependency to the useEffect hook

    return (
        <div>
            <Table rows={recipeList} tableType="recipe" setSavedRecipe={setSavedRecipe}></Table>
        </div>
    );
}

export default SavedRecipes;
