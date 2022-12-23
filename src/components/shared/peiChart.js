import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



ChartJS.register(ArcElement, Tooltip, Legend);



export function PeiChart(props) {
    const data = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                label: '',
                data: [props.male, props.female],
                backgroundColor: [

                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };
    return <div><Pie data={data} className='pie_chart' /></div>;
}
