import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js/auto';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    x: {
      type: 'category',
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'],
    },
    y: {
      min: 0,
      max: 1000,
    },
  },
};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      fill: true,
      label: 'Sales',
      data: [65, 59, 80, 900, 598, 557, 800,1000,256,300,700,320],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function MyChart() {
  return <Line options={options} data={data} />;
}

export default MyChart;
