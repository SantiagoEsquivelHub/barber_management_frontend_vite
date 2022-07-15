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
  notification,
  Result
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Pagination from 'react-bootstrap/Pagination';
import CardUser from './components/CardUser';
import './users.css'

const { Option } = Select;
const { Search } = Input;

const layout = {
  labelCol: { span: 20 },
  wrapperCol: { span: 50 },
};

const UsersView = () => {

  const [user, setUser] = useState(false);
  const [rol, setRol] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [busqueda, setBusqueda] = useState({
    search: '',
    page: ''
  });
  const [dataUser, setDataUser] = useState(false);
  const [result, setResult] = useState({});
  const [form] = Form.useForm();

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

  const url = `http://${document.domain}:3001/usuarios/`;
  const urlRol = `http://${document.domain}:3001/roles/`;
  const urlCrearUsuario = `http://${document.domain}:3001/crearUsuario/`;
  const urlBusqueda = `http://${document.domain}:3001/busqueda/`;
  const btnSearch = document.querySelector('.contenedor_main .ant-input-search-button');

  let prev_page = document.querySelector(".prev-page");
  let next_page = document.querySelector(".next-page");
  let elementos = document.querySelector(".displaying-num");
  let current_page = document.querySelector(".current_page");

  let token = localStorage.getItem("token");
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  headers.append("Content-type", "application/json");


  const getUsers = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const res = await fetch(url, requestOptions);
    const data = await res.json();
    let count = data["cantidad"]

    setUser(data['result']);
    elementos.innerHTML = `${count} elementos`


  }

  const getRoles = async (e) => {

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const res = await fetch(urlRol, requestOptions);
    const data = await res.json();
    //console.log("roles", data);
    setRol(data);

  }

  useEffect(() => {

    getUsers();
    getRoles();

  }, [])


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (e, form) => {

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ...datos
      }
      )

    }

    const res = await fetch(urlCrearUsuario, requestOptions);
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

  const handleCancel = () => {
    setVisible(false);
  };


  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e.fileList;
    }

    return e.fileList;
  };


  const handleInputChange = (e) => {

    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })

  }

  const handleSelectChange = (value) => {

    setDatos({
      ...datos,
      estado_usuario: '1',
      rol_usuario: `${value}`
    })

  };

  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
  }

  const getUrl = async () => {
    const fileInput = document.getElementById('url_img_usuario');
    const selectedFile = fileInput.files[0];

    const btn = document.getElementsByClassName('btnCrearUsuario');

    if (selectedFile.type != "image/png" && selectedFile.type != "image/jpeg" && selectedFile.type != "image/jpg") {
      //console.log('LLEGO');
      alert("Solo se permiten imágenes en PDF, JPG y JPEG")
      fileInput.value = "";
      //console.log(btn[0])
      btn[0].setAttribute('disabled', 'true');
    } else {
      btn[0].removeAttribute('disabled');


      let result = await getBase64(selectedFile);
      let url = result;

      setDatos({
        ...datos,
        [fileInput.id]: url
      })
    }
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });


  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: '¡Usuario creado correctamente!',
      description:
        'Los datos ingresados son correctos :)',
    });
  };

  const onSearchUsers = async (value) => {

    /*     bodyUsers.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border text-warning" role="status">
        <span class="sr-only"></span>
      </div>
      </div>` */

    if (value == '') {
      getUsers()
      setDataUser(false);
    }

    setTimeout(() => {
      setBusqueda({
        search: value,
        page: 1
      });

      localStorage.setItem('search', value);
    }, 3000);



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


    if (data['result'].length == 1) {
      elementos.innerHTML = `
        1 elemento
      `;
    } else {
      elementos.innerHTML = `
      ${data["count"]} elementos
    `;
    }

    //current_page.textContent = data['pages'];

    if (data['next'] == null) {
      prev_page.setAttribute("style", "display:none");
    } else {
      prev_page.removeAttribute("style");
      prev_page.setAttribute("data-page", `${data["previous"]}`);
    }

    if (data['previous'] == null) {
      next_page.setAttribute("style", "display:none");
    } else {
      next_page.removeAttribute("style");
      next_page.setAttribute("data-page", `${data["next"]}`);
    }




    /* else {
 
      busquedaArr.forEach(user => {
        let busquedaHTML =
          `<CardUser
        key=${user.id_usuario}
        nombre=${user.nombre_usuario}
        correo=${user.correo_usuario}
        telefono=${user.telefono_usuario}
        estado=${user.estado_usuario}
        url=${user.url_img_usuario}
        id=${user.id_usuario}
        />`;
 
        bodyUsers.innerHTML += busquedaHTML;
 
      })
    }  */
  }

  const prevNextPage = (e) => {

    /*  let search = localStorage.getItem("search")
     let page_next_prev = e.target.getAttribute("data-page");
     onSearchUsers(search); */
  }

  return (
    <div className='contenedor_main'>
      <h1>Usuarios</h1>

      <div className='d-flex justify-content-around'>

        <Button type="primary" onClick={showModal} className="btnAgregarUsuario">
          Añadir usuario
        </Button>
        <Search
          placeholder="input search text"
          onSearch={onSearchUsers}
          style={{
            width: 200,
          }}
          enterButton />

        <Pagination className='d-flex align-items-center'>
          <span className="displaying-num m-2"></span>
          <Pagination.Prev className='prev-page' onClick={prevNextPage} data-page="" />

          <Pagination.Item className='current_page' active>{1}</Pagination.Item>

          <Pagination.Next className='next-page' onClick={prevNextPage} data-page="" />

        </Pagination>
      </div>

      <Modal
        visible={visible}
        title="Crear usuario"
        onCancel={handleCancel}
        width="800px"
        footer={[


        ]}
      >

        <Form {...layout} form={form} name="crearUsuario" className="crearUsuario" id="crearUsuario" onFinish={handleOk}>

          <Row className='d-flex align-items-center justify-content-center foto_perfil'>
            <Form.Item
              name="url_img_usuario"
              label=""
              valuePropName="fileList"
              getValueFromEvent={normFile}
              onChange={getUrl}
              rules={[{ required: true, message: "Este campo es obligatorio" }]}
            >
              <Upload name="url_img_usuario" listType="picture" {...props} maxCount={1} id="url_img_usuario" accept="image/png, image/jpeg, image/jpg">
                <Button icon={<UploadOutlined />}>Foto de perfil</Button>
              </Upload>
            </Form.Item>
          </Row>

          <Row className='col-12 d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center'>
              <Col span={12} className="m-3">
                <Form.Item name="nombre_usuario" label="Nombre" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" onChange={handleInputChange} name="nombre_usuario" />
                </Form.Item>
                <Form.Item name="fecha_nacimiento_usuario" label="Nacimiento" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="date" onChange={handleInputChange} name="fecha_nacimiento_usuario" />
                </Form.Item>
                <Form.Item name="rol_usuario" label="Rol" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Select required
                    defaultValue='Seleccione:'
                    placeholder=""
                    onChange={handleSelectChange}
                    allowClear
                    name="rol_usuario"
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
                <Form.Item name="correo_usuario" label="Correo" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" onChange={handleInputChange} name="correo_usuario" />
                </Form.Item>
                <Form.Item name="documento_usuario" label="Documento" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" onChange={handleInputChange} name="documento_usuario" />
                </Form.Item>
                <Form.Item name="telefono_usuario" label="Teléfono" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                  <Input type="text" onChange={handleInputChange} name="telefono_usuario" />
                </Form.Item>
              </Col>
            </div>
          </Row>
          <div className='d-flex justify-content-center'>
            <Form.Item >
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} className="btnCrearUsuario">
                Crear
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <div id='bodyUsers'>
        <ul className=''>
          {!user ? '' :

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
        <ul>
          {!dataUser ? '' :

            dataUser.map(dataUser => {
              return <CardUser
                key={dataUser.id_usuario}
                nombre={dataUser.nombre_usuario}
                correo={dataUser.correo_usuario}
                telefono={dataUser.telefono_usuario}
                estado={dataUser.estado_usuario}
                url={dataUser.url_img_usuario}
                id={dataUser.id_usuario}
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


    </div >
  )
}

export default UsersView;