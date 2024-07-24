import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, LineController, BarController);

const avgNutrients = [529, 20, 130, 60]

const NutrientsChart = ({ calories, protein, carbs, fat }) => {
    const data = {
        labels: ['calories', 'protein', 'carbs', 'fat'],
        datasets: [
            {
                type: 'bar',
                label: 'Nutrient Amount',
                data: [calories, protein, carbs, fat],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                type: 'line',
                label: 'Average Nutrient Amount',
                data: avgNutrients,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Nutrients Table',
            },
        },
    };

    return <Chart type='bar' data={data} options={options} />;
};

export default NutrientsChart;
