import React, { useState, useEffect } from 'react'
import './RecipeAdder.css';
// to keep track of:
// ingredients + quantity 
// serving size
// servings
// steps
// recipe name 

const RecipeAdder = () => {
    const [ingredients, setIngredients] = useState([]);
    const [servingSize, setServingSize] = useState(0);
    const [servings, setServings] = useState(0);
    const [steps, setSteps] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [search, setSearch] = useState('');

    const onAddIngredient = (addItem) => {
        setIngredients(ingredients => [...ingredients, addItem]);
        setSearch('');
    };

    const onAddRecipe = () => {
        // TODO: ADD ENDPOINT TO ADD RECIPE INTO DATABASE 
        console.log("adding: ", ingredients); 
    }

    const IngredientItems = ({ingredientName}) => {
        const removeSelf = () => {
            let newList = [...ingredients]; // Create a new array reference
            const idx = newList.indexOf(ingredientName);
            if (idx > -1) {
                newList.splice(idx, 1);
                setIngredients(newList); // Update state with the new array reference
            }
        };

        return (
            <div className="itemDiv" >
                {ingredientName}
                <button onClick={() => removeSelf()} style = {{ backgroundColor: '#FFCCCB' }}>X</button>
            </div>
        );
    };


    return (
        <div className="add-ingredient-container">
            <div className="nameContainer">
                <div>Recipe Name</div>
                <input
                    type="text"
                    placeholder="Add Recipe Name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
            </div>

            <div className = "servingContainer">   
                <div>Serving Size</div> 
                <input
                        type="number"
                        placeholder="Add Serving Size"
                        value={servingSize}
                        onChange={(e) => setServingSize(e.target.value)}
                        />
                <div>Serving Count</div> 
                <input
                        type="number"
                        placeholder="Add Serving Count"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                    />
            </div> 

            <div className="stepsContainer">
                <div>Steps</div>
                <input className = "stepsInput"
                        type="text"
                        placeholder="Add Serving Count"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                    />
            </div>

            <div className="add-bar">
                <input
                    type="text"
                    placeholder="Add ingredients"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => onAddIngredient(search)}>Add</button>
            </div>

            <button className = "addFullRecipeButton" onClick = {() => onAddRecipe()}>Add Full Recipe</button> 

            <div className="itemSection">
                {ingredients.map((item) => (
                    <IngredientItems ingredientName={item} />
                ))}
            </div>
        </div>
    )
}

export default RecipeAdder