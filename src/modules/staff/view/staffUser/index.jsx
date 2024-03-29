import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Col,
  Row,
  notification,
} from 'antd';
import { headers } from '../../../../components/headers/headers';
import { Timeline } from 'antd';
import Card from 'react-bootstrap/Card';
import BarChart from '../../../../components/BarChart';
import './staffUser.css';

const { Option } = Select;
const { confirm } = Modal;

/*Layout para inputs de los formularios*/
const layout = {
  labelCol: { span: 20 },
  wrapperCol: { span: 50 },
};

/*Componente usado para mostrar la interna de cada uno de los barberos*/

const StaffUserView = () => {

  /*Obtenemos los parametros enviados por la URL, en este caso, el id del barbero*/
  let params = useParams();

  /*Estados generales*/
  const [grafico, setGrafico] = useState(false);
  const [historial, setHistorial] = useState(false);
  const [statistics, setStatistics] = useState({
    day: '',
    month: '',
    avg: ''
  });
  const [internaBarber, setInternaBarber] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [servicios, setServicios] = useState(false);
  const [precio, setPrecio] = useState(false)
  const [form] = Form.useForm();
  const [datos, setDatos] = useState({
    nombre_cliente: '',
    fecha_cita: '',
    id_servicio: ''
  })

  /*Variables globales para las peticiones*/
  const urlVerUsuario = `http://${document.domain}:3001/usuarios/`;
  const urlServicios = `http://${document.domain}:3001/servicio/`;
  const urlCrearCita = `http://${document.domain}:3001/crearCita/`;
  const urlEditarBarbero = `http://${document.domain}:3001/editarUsuario/`;
  const urlHistorial = `http://${document.domain}:3001/crearHistorial/`;
  const urlObtHistorial = `http://${document.domain}:3001/serviciosHistorial/`;
  const urlIdCita = `http://${document.domain}:3001/idCita/`;
  const btnSubmitCita = document.querySelector('.btnCrearCita');
  const urlDay = `http://${document.domain}:3001/serviciosHoy/`;
  const urlMonth = `http://${document.domain}:3001/serviciosMes/`;
  const urlAvg = `http://${document.domain}:3001/serviciosPromedio/`;
  const urlGrafico = `http://${document.domain}:3001/serviciosMesGrafico/`;

  /*Función que carga la data de cada uno de los barberos*/
  const getInterna = async (idUserVer) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const ruta = urlVerUsuario + idUserVer;

    const res = await fetch(ruta, requestOptions);
    const data = await res.json();

    setInternaBarber(data[0]);
    localStorage.removeItem('idUserVer');

  }

  /*Función que carga la data de cada uno de los barberos*/
  const getServicios = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const res = await fetch(urlServicios, requestOptions);
    const data = await res.json();
    setServicios(data);

  }

  /*Función que cierra el modal del formulario para crear las citas*/
  const handleCancel = () => {
    setVisible(false);
  };

  /*Función que limpia los inputs del formulario para crear las citas*/
  const onReset = () => {
    form.resetFields();
    setPrecio(false)
  };


  /*Función que muestra el modal que tiene el formulario para crear las citas*/
  const showModal = () => {
    setVisible(true);
  };

  /*Función para actualizar los datos del usuario cada vez que hace cambios en los inputs del formulario de citas*/
  const handleInputChange = (e) => {

    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })

  }

  /*Función que actualiza cual item de la lista desplegable es seleccionado*/
  const handleSelectChange = async (value) => {

    setDatos({
      ...datos,
      ['id_servicio']: `${value}`
    })

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const res = await fetch(urlServicios + value, requestOptions);
    const data = await res.json();
    setPrecio(data[0].precio_servicio);
  };

  /*Función que crea citas*/
  const handleSubmitCitas = async (e) => {

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...datos
      }
      )
    }

    let idBarber = btnSubmitCita.id;

    const cita = await fetch(urlCrearCita, requestOptions);
    const resp = await getIdCita();
    const historia = await createHistorial(idBarber, resp[0].id_cita)

    openNotificationWithIcon('success');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      onReset();
      window.location.reload();
    }, 1000);

  };

  /*Función que muestra una notificación cuando se ha logrado crear una cita*/
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: '¡Cita creada correctamente!',
      description:
        'Los datos de la cita han sido ingresados :)',
    });
  };

  /*Función que muestra una notificación cuando se ha logrado actualizar el estado del barbero*/
  const openNotificationBarberUpdated = (type) => {
    notification[type]({
      message: '¡Estado del barbero actualizado correctamente!',
    });
  };

  /*Función actualiza el estado del barbero*/
  const updateBarber = async (idBarber, estado) => {

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        nombre_usuario: '',
        telefono_usuario: '',
        url_img_usuario: '',
        estado_usuario: estado == 'Activo' ? '0' : '1'
      }
      )
    }

    const res = await fetch(urlEditarBarbero + idBarber, requestOptions);
    openNotificationBarberUpdated('success');

    setTimeout(() => {
      window.location.reload();
    }, 1000);

  }

  /*Función muestra un modal de confimación para cambiar el estado del barbero*/
  const showUpdateBarberConfirm = async (estado) => {

    let idBarber = params.id;
    let title = estado == 'Activo' ? '¿Deseas cambiar el estado a Deshabilitado?' : '¿Deseas cambiar el estado a Activo?'

    confirm({
      title: title,
      icon: <InfoCircleOutlined />,
      content: 'Tranquilo, este cambio no es permanente :) ',
      okText: 'Sí',
      okType: 'info',
      cancelText: 'No',
      onOk() {
        updateBarber(idBarber, estado);
      },
    });
  };

  /*Función que retorna el numero de la cita creada para poder ponerla en el historial*/
  const getIdCita = async () => {

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...datos
      })
    }

    const res = await fetch(urlIdCita, requestOptions);
    const data = res.json();

    return data;
  }

  /*Función que crea en el historial del barbero la cita que acaba de crear*/
  const createHistorial = async (idBarber, idCita) => {

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        id_usuario: `${idBarber}`,
        id_cita: `${idCita}`
      }
      )
    }

    const res = await fetch(urlHistorial, requestOptions);

  }

  /*Función que carga la data que se va a mostrar en las cards que muestran las estadisticas del barbero*/
  const getStatistics = async () => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    let resDay = await fetch(urlDay + params.id, requestOptions);
    let dataDay = await resDay.json();

    let resMonth = await fetch(urlMonth + params.id, requestOptions);
    let dataMonth = await resMonth.json();

    let resAvg = await fetch(urlAvg + params.id, requestOptions);
    let dataAvg = await resAvg.json();

    setStatistics({
      day: dataDay,
      month: dataMonth,
      avg: dataAvg
    })
  }

  /*Función que carga la data que se va a mostrar en el Historial del barbero*/
  const getHistorial = async () => {
    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    let res = await fetch(urlObtHistorial + params.id, requestOptions);
    let data = await res.json();
    setHistorial(data);

  }

  /*Función que carga la data que se va a mostrar en el gráfico/diagrama del barbero*/
  const getDiagram = async () => {
    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    let res = await fetch(urlGrafico + params.id, requestOptions);
    let data = await res.json();
    console.log(data)
    setGrafico(data);
  }

  /*Funciones que se ejecutarán cuando se renderice la página*/
  useEffect(() => {

    getHistorial();
    getInterna(params.id);
    getServicios();
    getStatistics();
    getDiagram();

  }, [])

  return (
    <div className='contenedor_main'>
      {
        !internaBarber || !statistics || !grafico ? 'Cargando...' :

          <div>
            <div className='d-flex align-items-center justify-content-around'>
              <Card className='m-3 col-3'>
                <Card.Img variant="top" src={internaBarber.url_img_usuario} className='img_interna' />
                <Card.Body>
                  <Card.Title className='d-flex justify-content-center align-items-center'>{internaBarber.nombre_usuario}</Card.Title>
                  <Card.Text className='d-flex justify-content-center align-items-center card_text_info'>
                    {internaBarber.nombre_rol == null ? 'Sin información' : internaBarber.nombre_rol}
                  </Card.Text>
                  <Card.Text className='d-flex justify-content-evenly align-items-center'>
                    <p className='card_text_info'>Estado</p>
                    <p className={internaBarber.nombre_estado == 'Activo' ? 'activo' : 'deshabilitado'}>{internaBarber.nombre_estado == null || internaBarber.nombre_estado == undefined ? 'Sin información' : internaBarber.nombre_estado}</p>
                    <div className='d-flex justify-content-center align-items-center'>
                      <svg className='editar' id={internaBarber.id_usuario} onClick={() => showUpdateBarberConfirm(internaBarber.nombre_estado)} viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path id={internaBarber.id_usuario} onClick={(e) => showUpdateBarberConfirm(e, internaBarber.nombre_estado)} d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
                    </div>

                  </Card.Text>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Button type="primary" className={internaBarber.nombre_estado == 'Activo' ? 'btnAgregarCita' : 'ocultar'} onClick={showModal} >
                      Registrar cita
                    </Button>
                  </div>

                </Card.Body>
              </Card>


              <div className='d-flex flex-column col-6'>
                <div className='d-flex justify-content-center align-items-center'>
                  <Card className='m-3 col-4' >
                    <Card.Body>
                      <div className='d-flex justify-content-center align-items-center card_info mb-2'>{statistics.day}</div>
                      <Card.Text className='d-flex justify-content-center align-items-center card_text'>
                        Citas registradas hoy
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className='m-3 col-4' >
                    <Card.Body>
                      <div className='d-flex justify-content-center align-items-center card_info mb-2'>{statistics.month}</div>
                      <Card.Text className='d-flex justify-content-center align-items-center card_text'>
                        Total de citas en el mes
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className='m-3 col-4' >
                    <Card.Body>
                      <div className='d-flex justify-content-center align-items-center card_info mb-2'>{statistics.avg}</div>
                      <Card.Text className='d-flex justify-content-center align-items-center card_text'>
                        Promedio de citas por día
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>

                <div>
                  <Card className='m-3 col-7 centrar' >
                    <Card.Body >

                      <BarChart data={grafico} />
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
      }

      <div className='timeline_interna col-6 centrar'>
        <Card className='m-3' >
          <Card.Body>
            <div className='d-flex align-items-center justify-content-center mb-2'>
              <Card.Title className=''>Historial</Card.Title>
            </div>
            <div>
              <Timeline mode="alternate">
                {!historial || historial.length == 0 ? <Timeline.Item color='#fdc43f'></Timeline.Item> :

                  historial.map(element => {

                    return <Timeline.Item color='#fdc43f'>
                      <p className='yellow'>{element.nombre_servicio}</p>
                      <p>{element.nombre_cliente}</p>
                      <p>{element.fecha_cita}</p>
                      <p className='precio'>${element.precio_servicio}</p>
                    </Timeline.Item>


                  })

                }
              </Timeline>
            </div>
          </Card.Body>
        </Card>
      </div>



      <Modal
        visible={visible}
        title="Registrar cita"
        onCancel={handleCancel}
        width="800px"
        footer={[


        ]}
      >

        <Form {...layout} form={form} name="crearUsuario" className="crearUsuario" id="crearUsuario" onFinish={handleSubmitCitas}>

          <Row className='col-12 d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center'>
              <Col span={12} className="m-3">
                <Form.Item name="nombre_cliente" label="Nombre del cliente" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$" title="Ingresa un nombre válido" onChange={handleInputChange} name="nombre_cliente" />
                </Form.Item>

                <Form.Item name="id_servicio" label="Servicios" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Select required
                    defaultValue='Seleccione:'
                    placeholder=""
                    onChange={handleSelectChange}
                    allowClear
                    name="id_servicio"
                  >
                    {!servicios ? 'Cargando...' :

                      servicios.map((servicios) => {
                        return <Option key={servicios.id_servicio} value={servicios.id_servicio}>{servicios.nombre_servicio}</Option>

                      })

                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} className="m-3">
                <Form.Item name="fecha_cita" label="Fecha cita" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="datetime-local" onChange={handleInputChange} name="fecha_cita" />
                </Form.Item>

                {
                  !precio ? '' :
                    <div className='d-flex justify-content-center align-items-center'>
                      <p className="precio_interna">Precio a pagar: {precio}</p>
                    </div>
                }

              </Col>
            </div>
          </Row>
          <div className='d-flex justify-content-center'>
            <Form.Item >
              <Button htmlType="button" onClick={onReset}>
                Limpiar
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} className="btnCrearCita" id={internaBarber.id_usuario}>
                Registar
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal >
    </div >
  )
}

export default StaffUserView;