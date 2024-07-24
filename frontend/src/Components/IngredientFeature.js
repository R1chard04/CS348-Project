import React from 'react'
import {useState} from 'react'
import './IngredientFeature.css'

const IngredientFeature = () => {
    const [recipeName, setrecipeName] = useState("")

    const getIngredientPlot = () => {
        
    }

    return (
        <div className = "enter-ingredient-container">
            <div>Recipe Id</div>
            <input
                type="text"
                placeholder="Enter your recipe name"
                value={recipeName}
                onChange={(e) => setrecipeName(e.target.value)}
            />

            <button className = "fetchingredientPlot" onClick = {() => getIngredientPlot()}>
                Get a Ingredients Plot
            </button>
        </div>
    )
}

export default IngredientFeature