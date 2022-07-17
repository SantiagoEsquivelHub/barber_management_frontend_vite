import React, { useEffect, useState } from 'react';
import '../../../../components/style/global.css'
import CardUser from '../../../users/components/CardUser';
import '../../../users/users.css';
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

const { Search } = Input;

const StaffView = () => {

  const urlGetBarbers = `http://${document.domain}:3001/usuarios/`;

  const [barber, setBarber] = useState(false);
  const [busqueda, setBusqueda] = useState({
    search: '',
    page: ''
  });

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
    //elementos.innerHTML = `${count} elementos`


  }

  const onSearchUsers = async (value) => {

    if (value == '') {
      getBarbers()
      lista.removeAttribute('style')
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

    const ruta = urlBusqueda + value;

    console.log(ruta);

    const res = await fetch(ruta, requestOptions);
    const data = await res.json();
    let busquedaArr = Object.values(data["result"]);

    if (data["result"].length == 0) {
      setResult(false)
    } else {
      setResult(true)
    }
    setDataUser(busquedaArr);
    setUser(false);
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

        <div className='d-flex justify-content-around'>

          <Search
            placeholder="input search text"
            onSearch={onSearchUsers}
            style={{
              width: 200,
            }}
            enterButton />

          <span className="displaying-num m-2"></span>
        </div>

        <div id='bodyUsers'>
          <ul className='lista'>
            {!barber ? '' :

              barber.map(barber => {
                return <CardUser
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
        </div>
      </div>
    </>
  )
}

export default StaffView;