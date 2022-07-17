import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './staffUser.css';
import { Timeline } from 'antd';

const { Meta } = Card;
const StaffUserView = () => {
  let params = useParams();
  console.log(params.id);

  const [internaBarber, setInternaBarber] = useState(false)

  const urlVerUsuario = `http://${document.domain}:3001/usuarios/`;

  let token = localStorage.getItem("token");
  let headers2 = new Headers();
  headers2.append("Authorization", "Bearer " + token);
  headers2.append("Content-type", "application/json");
  headers2.append("Access-Control-Allow-Origin", "*")

  const getInterna = async (idUserVer) => {

    const requestOptions = {
      method: 'GET',
      headers: headers2,
    }

    const ruta = urlVerUsuario + idUserVer;
    console.log(ruta);
    const res = await fetch(ruta, requestOptions);
    const data = await res.json();
    console.log(data[0]);
    setInternaBarber(data[0]);
    localStorage.removeItem('idUserVer');

  }

  useEffect(() => {
    getInterna(params.id);
  }, [])


  return (
    <div className='contenedor_main'>
      {
        !internaBarber ? 'Cargando...' :

          <div>
            <div className='d-flex align-items-center justify-content-around'>
              <Card className='m-3 col-3'>
                <Card.Img variant="top" src={internaBarber.url_img_usuario} className='img_interna' />
                <Card.Body>
                  <Card.Title className='d-flex justify-content-center align-items-center'>{internaBarber.nombre_usuario}</Card.Title>
                  <Card.Text className='d-flex justify-content-center align-items-center'>
                    {internaBarber.nombre_rol == null ? 'Sin información' : internaBarber.nombre_rol}
                  </Card.Text>
                  <Card.Text className='d-flex justify-content-evenly align-items-center'>
                    <p>Estado</p>
                    <p className='estado_interna'>{internaBarber.nombre_estado == null || internaBarber.nombre_estado == undefined ? 'Sin información' : internaBarber.nombre_estado}</p>
                  </Card.Text>

                </Card.Body>
              </Card>
              <div className='d-flex flex-column col-6'>
                <div className='d-flex justify-content-center align-items-center'>
                  <Card className='m-3 col-4' >
                    <Card.Body>
                      <div className='d-flex justify-content-center align-items-center card_info mb-2'>10</div>
                      <Card.Text className='d-flex justify-content-center align-items-center'>
                        Citas registradas hoy
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className='m-3 col-4' >
                    <Card.Body>
                      <div className='d-flex justify-content-center align-items-center card_info mb-2'>10</div>
                      <Card.Text className='d-flex justify-content-center align-items-center'>
                        Total de servicios en el mes
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className='m-3 col-4' >
                    <Card.Body>
                      <div className='d-flex justify-content-center align-items-center card_info mb-2'>10</div>
                      <Card.Text className='d-flex justify-content-center align-items-center'>
                        Promedio de servicios por día
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>

                <div>
                  <Card className='m-3 col-12' >
                    <Card.Body>
                      <div className='d-flex justify-content-center align-items-center card_info mb-2'>10</div>
                      <Card.Text className='d-flex justify-content-center align-items-center'>
                        Promedio de servicios por día
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>

            <div className='timeline_interna'>
              <Card className='m-3' >
                <Card.Body>
                <Card.Title className=''>Historial</Card.Title>

                  <Timeline>
                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item color="red">
                      <p>Solve initial network problems 1</p>
                      <p>Solve initial network problems 2</p>
                      <p>Solve initial network problems 3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item>
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item color="gray">
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item color="gray">
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item color="#00CCFF">
                      <p>Custom color testing</p>
                    </Timeline.Item>
                  </Timeline>
                </Card.Body>
              </Card>
            </div>
          </div>
      }

    </div>
  )
}

export default StaffUserView;