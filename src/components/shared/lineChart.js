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

const lineChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',

      },
      title: {
        display: true,
        text: `Total No. Of People Registered In a Year ${props.year}`,
      },

    },
  };
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 'Jul', 'Aug', "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Users",
        data: [props.Jan, props.Feb, props.Mar, props.Apr, props.May, props.Jun, props.Jul, props.Aug, props.Sep, props.Oct, props.Oct, props.Dec],
        fill: true,
        backgroundColor: "#2792CB",
        borderColor: "#2792CB",
        shadowColor: "#2792CB",
      }
    ]
  };
  return (
    <div  >
      <Line options={options} className="lineinnerheight" data={data} />
    </div>
  )

}
export default lineChart;