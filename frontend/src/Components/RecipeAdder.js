import React, { useState, useEffect } from 'react'
import './RecipeAdder.css';
// to keep track of:
// ingredients + quantity 
// serving size
// servings
// steps
// recipe name 

const RecipeAdder = () => {
    const [msg, setMsg] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [servingSize, setServingSize] = useState(0);
    const [servings, setServings] = useState(0);
    const [steps, setSteps] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [search, setSearch] = useState('');

    const onAddIngredient = (addItem) => {
        setIngredients(ingredients => [...ingredients, addItem]);
        setSearch('');
    };

    const onAddRecipe = () => {
        fetch(`http://127.0.0.1:5000/addrecipe/${recipeName}/${description}/${servings}/${servingSize}/${steps}/${ingredients.join(',')}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
            }
        }).then(response => response.json())
            .then(data => { console.log("msg", data.msg); setMsg(data.msg); })
            .catch(error => console.error(error));

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
                <button className = "removeSelfButton" onClick={() => removeSelf()}>X</button>
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

            <div className="nameContainer">
                <div>Recipe Description</div>
                <input
                    type="text"
                    placeholder="Add Recipe Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                <textarea className = "stepsInput"
                        type="text"
                        placeholder="Add Steps"
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
            <h5 className='success-message'>{msg && msg}</h5>

            <div className="itemSection">
                {ingredients.map((item) => (
                    <IngredientItems ingredientName={item} />
                ))}
            </div>
        </div>
    )
}

export default RecipeAdder