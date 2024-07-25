import React, {useState} from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './BMICalculator.css';

Chart.register(...registerables);

const BMICharts = ({ bmiData, userBmi }) => {

    

    const histogramData = {
        labels: Array.from({ length: 10 }, (_, i) => i + 1),
        datasets: [
            {
                label: 'BMI Index',
                data: bmiData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const histogramOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'BMI Index',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Frequency',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        xMin: userBmi,
                        xMax: userBmi,
                        borderColor: 'red',
                        borderWidth: 2,
                        borderDash: [10, 5],
                        label: {
                            content: `Your BMI: ${userBmi.toFixed(2)}`,
                            enabled: true,
                            position: 'end',
                        },
                    },
                },
            },
        },
    };

    const boxPlotData = {
        labels: ['Male', 'Female'], // Example labels, adjust as needed
        datasets: [
            {
                label: 'BMI Index by Gender',
                data: bmiData, // Adjust this to actual data structure
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const boxPlotOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Gender',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'BMI Index',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: userBmi,
                        yMax: userBmi,
                        borderColor: 'red',
                        borderWidth: 2,
                        borderDash: [10, 5],
                        label: {
                            content: `Your BMI: ${userBmi.toFixed(2)}`,
                            enabled: true,
                            position: 'start',
                        },
                    },
                },
            },
        },
    };

    return (
        <div>
            <div style={{ width: '80%', margin: 'auto' }}>
                <h2>Distribution of BMI Index</h2>
                <Bar data={histogramData} options={histogramOptions} />
            </div>
            <div style={{ width: '80%', margin: 'auto', marginTop: '50px' }}>
                <h2>BMI Index by Gender</h2>
                <Bar data={boxPlotData} options={boxPlotOptions} />
            </div>
        </div>
    );
};

const BMICalculator = () => {
    const [height, setHeight] = useState(0); 
    const [weight, setWeight] = useState(0); 
    const [bmi, setBMI] = useState(0);
    const [bmiIndexes, setBMIIndexes] = useState([]);

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
        if (!bmiIndexes.length) {
            fetch(`http://127.0.0.1:5000/getbmiplot/`, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                }
            }).then(response => response.json())
                .then(data => { console.log("msg: ", data); setBMIIndexes(data.msg); })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className = "enter-BMI-container">
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
            <button className = "fetchBMI" onClick = {() => getBMI()}>
                Calculate your BMI 
            </button>

            <button className = "fetchBMIPlot" onClick = {() => getBMIPlot()}>
                Get a BMI Plot
            </button>

            <h1>{bmi ? bmi : ''}</h1>
            {bmi && bmiIndexes.length ? <BMICharts bmiData={bmiIndexes} userBmi={bmi} /> : null}
        </div>
    );
}

export default BMICalculator;
