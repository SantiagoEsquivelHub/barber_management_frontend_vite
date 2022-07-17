import React, { useEffect, useState } from 'react';
import '../../../../components/style/global.css'
import '../../../users/users.css';
import './staff.css';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Col,
  Row,
  Upload,
  notification,
  Result
} from 'antd';
import  CardBarber from '../../components/CardBarber';

const { Search } = Input;

const StaffView = () => {

  const urlGetBarbers = `http://${document.domain}:3001/barberos/`;
  const urlBusquedaBarbers = `http://${document.domain}:3001/busqueda/`;

  const [barber, setBarber] = useState(false);
  const [dataBarber, setDataBarber] = useState(false);
  const [result, setResult] = useState(true);
  const [busqueda, setBusqueda] = useState({
    page: '',
    type: 'barberos'
  });

  
  let lista = document.querySelector(".lista");
  let elementos = document.querySelector(".displaying-num");
  let token = localStorage.getItem("token");
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  headers.append("Content-type", "application/json");

  useEffect(() => {

    getBarbers();


  }, [])

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