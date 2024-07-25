import React from 'react'
import {useState} from 'react'
import './BMICalculator.css'

const BMICalculator = () => {
    const [height, setHeight] = useState(0); 
    const [weight, setWeight] = useState(0); 
    const [bmi, setBMI] = useState(0);
    const [hasPlot, setHasPlot] = useState(false);

    const getBMI = () => {
        fetch(`http://127.0.0.1:5000/getbmi/${weight}/${height}`, {
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
            }
        }).then(response => response.json())
            .then(data => { console.log("msg: ", data); setBMI(data.msg); })
            .catch(error => console.error(error));
    }

    const getBMIPlot = () => {
        fetch(`http://127.0.0.1:5000/getbmiplot/${weight}/${height}`, {
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
            }
        }).then(response => {return response.json();})
            .then(data => { 
                console.log("Plot data: ", data);
                setHasPlot(true);
            })
            .catch(error => console.error("MISTAKE: ", error));
    }

    return (
        <div className="enter-BMI-container">
            <div>Height</div>
            <input
                type="number"
                placeholder="Enter your height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <div>Weight</div>
            <input
                type="number"
                placeholder="Enter your weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <button className="fetchBMI" onClick={getBMI}>
                Calculate your BMI 
            </button>

            <button className="fetchBMIPlot" onClick={getBMIPlot}>
                Get a BMI Plot
            </button>

            {hasPlot && 
                <img className="bmi-plot" src="/bmiPlot.png" alt="BMI Plot" />
            }

            <h1>{bmi ? bmi : ''}</h1>
        </div>
    );
}

export default BMICalculator;
