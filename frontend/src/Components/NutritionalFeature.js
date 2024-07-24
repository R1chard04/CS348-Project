import React from 'react'
import {useState} from 'react'
import './NutritionalFeature.css'

const NutritionalFeature = () => {
    const [recipeId, setRecipeId] = useState(0);

    const getNutritionPlot = () => {

    }

    return (
        <div className = "enter-nutrition-container">
            <div>Recipe Id</div>
            <input
                type="number"
                placeholder="Enter the Recipe ID"
                value={recipeId}
                onChange={(e) => setRecipeId(e.target.value)}
            />

            <button className = "fetchnutritionPlot" onClick = {() => getNutritionPlot()}>
                Get a Nutritional Plot
            </button>
        </div>
    );
}

export default NutritionalFeature;
