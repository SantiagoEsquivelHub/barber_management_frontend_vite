import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import faker from 'faker';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
        text: 'Servicios brindados este mes',
      },
    },
  };
  
  

const BarChart = ({ data }) => {
 
let labels = data?.map(e=> e.nombre_servicio);
let datas = data?.map(e=> e.count);

  let data1 = {
    labels: labels,
    datasets: [
      {
        label: 'Servicios',
        data: datas,
        borderColor: '#fdc43f',
        backgroundColor: '#fdc43f',
      },
    ],
  };

    return (
      
            <Line options={options} data={data1} />
        
    )
}

export default BarChart;