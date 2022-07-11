import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import axios from "axios";
import CardUser from './components/CardUser';



const UsersView = () => {

  const [user, setUser] = useState(false)

  const url = `http://${document.domain}:3001/usuarios/`;


  const getUsers = async (e) => {

    const requestOptions = {
      method: 'GET'
    }

    const res = await fetch(url, requestOptions);
    const data = await res.json();
    console.log(data);
    setUser(data);

  }

  useEffect(() => {

    getUsers();


  }, [])


  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };


  return (
    <div className='contenedor_main'>
      <h1>UsersView</h1>

      <Button type="primary" onClick={showModal}>
        Añadir usuario
      </Button>
      <Modal
        visible={visible}
        title="Crear usuario"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Crear
          </Button>
        ]}
      >
        <form method='POST' id='crearUsuario' name='crearUsuario' >
          <div className='col-12 d-flex flex-column align-items-center'>
            <label for='url_img_usuario'>Foto de perfil</label>
            <input id='url_img_usuario' name='url_img_usuario' type='file' />
          </div>
          <div className='d-flex'>
            <div className='col-6'>
              <div className='m-4'>
                <label for='nombre_usuario'>Nombre completo</label>
                <input id='nombre_usuario' name='nombre_usuario' type='text' />
              </div>

              <div className='m-4'>
                <label for='fecha_nacimiento_usuario'>Fecha de nacimiento</label>
                <input id='fecha_nacimiento_usuario' name='fecha_nacimiento_usuario' type='date' />
              </div>

              <div className='m-4'>
                <label for='rol_usuario'>Rol</label>
                <select id='rol_usuario' name='rol_usuario' />
              </div>
            </div>

            <div className='col-6'>
              <div className='m-4'>
                <label for='correo_usuario'>Correo electrónico</label>
                <input id='correo_usuario' name='correo_usuario' type='email' />
              </div>

              <div className='m-4'>
                <label for='fecha_nacimiento_usuario'>Número de documento</label>
                <input id='fecha_nacimiento_usuario' name='fecha_nacimiento_usuario' type='text' />
              </div>

              <div className='m-4'>
                <label for='telefono_usuario'>Teléfono</label>
                <input id='telefono_usuario' name='telefono_usuario' type='text'/>
              </div>
            </div>
          </div>
        </form>
      </Modal>


      <ul>
        {!user ? 'Cargando' :

          user.map(user => {
            return <CardUser
              key={user.id_usuario}
              nombre={user.nombre_usuario}
              correo={user.correo_usuario}
              telefono={user.telefono_usuario}
              estado={user.estado_usuario}
              url={user.url_img_usuario}
              id={user.id_usuario}
            />

          })

        }
      </ul>






    </div>
  )
}

export default UsersView;