import React, { useEffect, useState } from 'react';
import {
  Input,
  Result
} from 'antd';
import { headers } from '../../../../components/headers/headers';
import CardBarber from '../../components/CardBarber';
import '../../../../components/style/global.css'
import '../../../users/users.css';
import './staff.css';

const { Search } = Input;

/*Componente usado para mostrar la interna de cada uno de los barberos*/

const StaffView = () => {

  /*Variables globales para las peticiones*/
  const urlGetBarbers = `http://${document.domain}:3001/barberos/`;
  const urlBusquedaBarbers = `http://${document.domain}:3001/busqueda/`;

  /*Estados generales*/
  const [barber, setBarber] = useState(false);
  const [dataBarber, setDataBarber] = useState(false);
  const [result, setResult] = useState(true);
  const [busqueda, setBusqueda] = useState({
    page: '',
    type: 'barberos'
  });

  /*Elementos del DOM*/
  let lista = document.querySelector(".lista");
  let elementos = document.querySelector(".displaying-num");

  /*Función para obtener la data de todos los barberos a mostrar*/
  const getBarbers = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const res = await fetch(urlGetBarbers, requestOptions);
    const data = await res.json();
    let count = data["cantidad"]

    setBarber(data['result']);
    elementos.innerHTML = `${count} elementos`


  }

  /*Función para hacer búsquedas de barberos*/
  const onSearchBarbers = async (value) => {

    if (value == '') {
      getBarbers();
      setDataBarber(false);
      lista.removeAttribute('style');
      setResult(true);
    }


    setBusqueda({
      search: value,
      page: 1
    });

    localStorage.setItem('search', value);


    console.log(isNaN(parseInt(value)))

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...busqueda
      })
    }

    const ruta = urlBusquedaBarbers + value;

    console.log(ruta);

    const res = await fetch(ruta, requestOptions);
    const data = await res.json();
    let busquedaArr = Object.values(data["result"]);

    if (data["result"].length == 0) {
      setResult(false)
    }
    setDataBarber(busquedaArr);
    setBarber(false);
    lista.setAttribute('style', 'display:none')

    if (data['result'].length == 1) {
      elementos.innerHTML = `
        1 elemento
      `;
    } else {
      elementos.innerHTML = `
      ${data["count"]} elementos
    `;
    }


  }

  /*Función que se ejecutarán cuando se renderice la página*/
  useEffect(() => {

    getBarbers();

  }, [])

  return (
    <>
      <div className='contenedor_main'>
        <h1>Barberos</h1>

        <div className='d-flex justify-content-around mb-3'>

          <Search
            placeholder="input search text"
            onSearch={onSearchBarbers}
            style={{
              width: 200,
            }}
            enterButton />

          <span className="displaying-num m-2"></span>
        </div>

        <div id='bodyBarbers'>
          <ul className='lista'>
            {!barber ? '' :

              barber.map(barber => {
                return <CardBarber
                  key={barber.id_usuario}
                  nombre={barber.nombre_usuario}
                  correo={barber.correo_usuario}
                  telefono={barber.telefono_usuario}
                  estado={barber.estado_usuario}
                  url={barber.url_img_usuario}
                  id={barber.id_usuario}
                />

              })

            }
          </ul>
          <ul>
            {!dataBarber ? '' :

              dataBarber.map(dataBarber => {
                return <CardBarber
                  key={dataBarber.id_usuario}
                  nombre={dataBarber.nombre_usuario}
                  correo={dataBarber.correo_usuario}
                  telefono={dataBarber.telefono_usuario}
                  estado={dataBarber.estado_usuario}
                  url={dataBarber.url_img_usuario}
                  id={dataBarber.id_usuario}
                />

              })

            }
          </ul>
          <div>
            {
              !result ? <Result
                title="Sin resultados"
              /> : ''
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default StaffView;