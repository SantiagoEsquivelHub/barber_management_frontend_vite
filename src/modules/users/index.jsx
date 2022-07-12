import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Col,
  Row,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CardUser from './components/CardUser';
import './users.css'

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 50 },
};

const UsersView = () => {

  const [user, setUser] = useState(false);
  const [rol, setRol] = useState(false);

  const url = `http://${document.domain}:3001/usuarios/`;
  const urlRol = `http://${document.domain}:3001/roles/`;
  let token = localStorage.getItem("token");
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);



  const getUsers = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const res = await fetch(url, requestOptions);
    const data = await res.json();
    //console.log(data);
    setUser(data);

  }

  const getRoles = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const res = await fetch(urlRol, requestOptions);
    const data = await res.json();
    console.log("roles", data);
    setRol(data);

  }

  useEffect(() => {

    getUsers();
    getRoles();

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


  const [form] = Form.useForm();


  const onFinish = () => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  const [datos, setDatos] = useState({
    nombre_usuario: '',
    documento_usuario: '',
    telefono_usuario: '',
    fecha_nacimiento_usuario: '',
    correo_usuario: '',
    estado_usuario: '',
    url_img_usuario: '',
    rol_usuario: ''
  })

  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: [e.target.value]
    })
  }


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
        width="800px"
        footer={[
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Crear
          </Button>

        ]}
      >

        <Form {...layout} form={form} name="crearUsuario" onFinish={onFinish} className="crearUsuario">

          <Row className='d-flex align-items-center justify-content-center foto_perfil'>
            <Form.Item
              name="upload"
              label=""
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Foto de perfil</Button>
              </Upload>
            </Form.Item>
          </Row>

          <Row className='col-12 d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center'>
              <Col span={12} className="m-3">
                <Form.Item name="nombre_usuario" label="Nombre" rules={[{ required: true }]} className="d-flex flex-column">
                  <Input type="text" onChange={handleInputChange} />
                </Form.Item>
                <Form.Item name="fecha_nacimiento_usuario" label="Nacimiento" rules={[{ required: true }]} className="d-flex flex-column">
                  <Input type="date" onChange={handleInputChange} />
                </Form.Item>
                <Form.Item name="rol_usuario" label="Rol" rules={[{ required: true }]} className="d-flex flex-column">
                  <Select
                    defaultValue='Seleccione:'
                    placeholder=""
                    onChange={handleInputChange}
                    allowClear
                  >
                    {!rol ? 'Cargando...' :

                      rol.map((rol) => {
                        return <Option key={rol.id_rol} value={rol.id_rol}>{rol.nombre_rol}</Option>

                      })

                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} className="m-3">
                <Form.Item name="correo_usuario" label="Correo" rules={[{ required: true }]} className="d-flex flex-column">
                  <Input type="text" onChange={handleInputChange} />
                </Form.Item>
                <Form.Item name="documento_usuario" label="Documento" rules={[{ required: true }]} className="d-flex flex-column">
                  <Input type="text" onChange={handleInputChange} />
                </Form.Item>
                <Form.Item name="telefono_usuario" label="Teléfono" rules={[{ required: true }]} className="d-flex flex-column">
                  <Input type="text" onChange={handleInputChange} />
                </Form.Item>
              </Col>
            </div>
          </Row>


        </Form>
      </Modal>


      <ul>
        {!user ? 'Cargando...' :

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



    </div >
  )
}

export default UsersView;