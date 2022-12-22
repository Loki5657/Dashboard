import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: `Total no. of people `,
        },
    },
};
const labels = ["Male", "Female", "Other"];
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Male',
            data: [10],
            backgroundColor: [
                'rgba(53, 162, 235, 0.5)',

            ],
            borderWidth: 1
        },
        {
            label: 'Female',
            data: [0, 22],
            backgroundColor: [

                'rgba(255, 99, 132, 0.5)',
            ],
            borderWidth: 1
        }
    ]

};

export function BarChart() {
    
    return <div><Bar options={options} data={data} className="lineinnerheight" /></div>;
}
