import React from 'react'
import {useState, useEffect} from 'react'
import './BMICalculator.css'

const BMICalculator = () => {
    const [height, setHeight] = useState(0); 
    const [weight, setWeight] = useState(0); 

    const getBMI = () => {
        fetch(`http://127.0.0.1:5000/getbmi/${weight}/${height}`, {
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
            }
        }).then(response => response.json())
            .then(data => { console.log("success"); console.log("this: ", data)})
            .catch(error => console.error(error));
    }
    const getBMIPlot = () => {

    }

    return (
        <div className = "enter-BMI-container">
            <div>Height</div>
            <input
                type="text"
                placeholder="Enter your height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <div>Weight</div>
            <input
                type="text"
                placeholder="Enter your weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <button className = "fetchBMI" onClick = {() => getBMI()}>
                Calculate your BMI 
            </button>

            <button className = "fetchBMIPlot" onClick = {() => getBMIPlot()}>
                Get a BMI Plot
            </button>
        </div>
    )
}

export default BMICalculator