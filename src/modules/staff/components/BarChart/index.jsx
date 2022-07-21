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
  
  const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '27', '28', '29', '30'];
  


const BarChart = ({ data }) => {
const labels = data.map(e=> e.nombre_servicio);
const datas = data.map(e=> e.count);

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