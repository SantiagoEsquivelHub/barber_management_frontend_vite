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
import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/*Objeto con las caracteristicas a mostrar que va a tener el gráfico*/
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Reporte mensual',
    },
  },
};

/*Componente que muestra una gráfica según la data que llega (se usa en la interna de los barberos y en el Dashboard)*/

const BarChart = ({ data }) => {

  /*Se obtienen los labels y la datas a mostrar, según la data que llega por desestructuración*/
  let labels = data?.map(e => e.nombre_servicio);
  let datas = data?.map(e => e.count);

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

BarChart.propTypes = {
  data: PropTypes.array.isRequired
}

export default BarChart;