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
  Upload,
  notification,
  Result
} from 'antd';
import Card from 'react-bootstrap/Card';
import './staffUser.css';
import { Timeline } from 'antd';

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;
const { confirm } = Modal;

const layout = {
  labelCol: { span: 20 },
  wrapperCol: { span: 50 },
};

const StaffUserView = () => {

  let params = useParams();

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

  const urlVerUsuario = `http://${document.domain}:3001/usuarios/`;
  const urlServicios = `http://${document.domain}:3001/servicio/`;
  const urlCrearCita = `http://${document.domain}:3001/crearCita/`;
  const urlEditarBarbero = `http://${document.domain}:3001/editarUsuario/`;

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

    const res = await fetch(ruta, requestOptions);
    const data = await res.json();

    setInternaBarber(data[0]);
    localStorage.removeItem('idUserVer');

  }

  const getServicios = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers2,
    }

    console.log(datos.id_servicio)

    const res = await fetch(urlServicios, requestOptions);
    const data = await res.json();
    //console.log("roles", data);
    setServicios(data);

  }


  useEffect(() => {
    getInterna(params.id);
    getServicios();
  }, [])

  const handleCancel = () => {
    setVisible(false);
  };


  const onReset = () => {
    form.resetFields();
    setPrecio(false)
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e.fileList;
    }

    return e.fileList;
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleInputChange = (e) => {

    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })

  }

  const handleSelectChange = async (value) => {

    setDatos({
      ...datos,
      ['id_servicio']: `${value}`
    })

    const requestOptions = {
      method: 'GET',
      headers: headers2,
    }


    const res = await fetch(urlServicios + value, requestOptions);
    const data = await res.json();
    setPrecio(data[0].precio_servicio);
    console.log(precio)
  };

  const handleSubmitCitas = async (e) => {

    const requestOptions = {
      method: 'POST',
      headers: headers2,
      body: JSON.stringify({
        ...datos
      }
      )
    }

    console.log(datos)

    const res = await fetch(urlCrearCita, requestOptions);
    //console.log(res)
    openNotificationWithIcon('success');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      onReset();
      window.location.reload();
    }, 3000);

  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: '¡Cita creada correctamente!',
      description:
        'Los datos de la cita han sido ingresados :)',
    });
  };

  const openNotificationBarberUpdated = (type) => {
    notification[type]({
      message: '¡Estado del barbero actualizado correctamente!',

    });
  };

  const getId = (e) => {

    let idUser = e.target.id;
    return idUser;
  }

  const updateBarber = async (idBarber, estado) => {


    const requestOptions = {
      method: 'POST',
      headers: headers2,
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
    }, 3000);

  }

  const showUpdateBarberConfirm = async (e, estado) => {

    let idBarber = getId(e);
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
                    <p className={internaBarber.nombre_estado == 'Activo' ? 'activo' : 'deshabilitado'}>{internaBarber.nombre_estado == null || internaBarber.nombre_estado == undefined ? 'Sin información' : internaBarber.nombre_estado}</p>
                    <div className='d-flex justify-content-center align-items-center'>
                      <svg className='editar' id={internaBarber.id_usuario} onClick={(e) => showUpdateBarberConfirm(e, internaBarber.nombre_estado)} viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path id={internaBarber.id_usuario} onClick={(e) => showUpdateBarberConfirm(e, internaBarber.nombre_estado)} d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
                    </div>
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

            <div className='timeline_interna col-6'>
              <Card className='m-3' >
                <Card.Body>
                  <div className='d-flex align-items-center justify-content-between mb-2'>
                    <Card.Title className=''>Historial</Card.Title>
                    <Button type="primary" className="btnAgregarCita" onClick={showModal}>
                      Registrar cita
                    </Button>
                  </div>
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
                  <Input type="text" onChange={handleInputChange} name="nombre_cliente" />
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
                Reset
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} className="btnCrearCita">
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