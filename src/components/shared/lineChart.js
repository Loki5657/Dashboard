import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,

} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,

);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
   
    },
    title: {
      display: true,
      text: 'Total no. of people registered in a year (2020-2021)',
    },
   
  },
};


export const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 'Jul', 'Aug'],
    datasets: [
        {
            label: "Users",
            data: [1,3,2,4,3,2,5,4],
            fill: true,
            backgroundColor: "#2792CB",
            borderColor: "#2792CB",
            shadowColor:"#2792CB",
        }
    ]
};

const lineChart=()=>{
  return (
    <div >
       <Line options={options} className="lineinnerheight" data={data} />
    </div>
  )

}
export default lineChart;