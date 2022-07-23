import React, { useState } from 'react';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Modal,
    Form,
    Input,
    Select,
    Button,
    Col,
    Row,
    Upload,
    notification
} from 'antd';
import { useGetBase64 } from '../../../../hooks/useGetBase64';
import { headers } from '../../../../components/headers/headers';

const { Option } = Select;

/*Layout para inputs de los formularios*/
const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 50 },
};

/*Componente usado para mostrar la información de cada uno de los usuarios, como el nombre, correo, telefono, imagen, y estado*/

export const CardUser = ({ nombre, correo, telefono, estado, url, id }) => {

    const { confirm } = Modal;

    /*Estados generales*/
    const [users, setUsers] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleVerUsuario, setVisibleVerUsuario] = useState(false)
    const [form] = Form.useForm();
    const [datos, setDatos] = useState({
        nombre_usuario: '',
        telefono_usuario: '',
        estado_usuario: '',
        url_img_usuario: ''
    })

    /*Variables globales para las peticiones*/
    const urlVerUsuario = `http://${document.domain}:3001/usuarios/`;
    const urlEditarUsuario = `http://${document.domain}:3001/editarUsuario/`;
    const urlEliminarUsuario = `http://${document.domain}:3001/eliminarUsuario/`;

    let idUser = localStorage.getItem('id');

    /*Función para editar/actualizar usuarios*/
    const updateUsers = async (e) => {

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ...datos
            }
            )
        }

        const res = await fetch(urlEditarUsuario + id, requestOptions);
        openNotificationWithIcon('success');

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
            onReset();
            window.location.reload();
        }, 1000);

    }

    /*Función para eliminar usuarios*/
    const deleteUsers = async (idUserDel) => {

        const requestOptions = {
            method: 'POST',
            headers: headers,
        }

        const ruta = urlEliminarUsuario + idUserDel;
        console.log(ruta)
        const res = await fetch(ruta, requestOptions);

        openNotificationWithIconDelete('success');

        setLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }

    /*Función para obtener la data de cada usuario*/
    const getUsers = async (idUserVer) => {

        const requestOptions = {
            method: 'GET',
            headers: headers,
        }

        const ruta = urlVerUsuario + idUserVer;
        console.log(ruta);
        const res = await fetch(ruta, requestOptions);
        const data = await res.json();
        console.log(data[0]);
        setUsers(data[0]);
        localStorage.removeItem('idUserVer');

    }

    /*Función que abre el modal del formulario para editar usuarios*/
    const openEditUser = (e) => {
        setVisible(true);
    }

    /*Función que retorna el id del usuario a eliminar*/
    const getIdDelete = (e) => {
        let idUserDel = e.target.id;
        return idUserDel;
    }

    /*Función que cierra el modal del formulario para editar usuarios*/
    const handleCancel = () => {
        setVisible(false);
    };

    /*Función que limpia los inputs del formulario para editar usuarios*/
    const onReset = () => {
        form.resetFields();
    };

    /*Función para actualizar los datos del usuario cada vez que hace cambios en los inputs del formulario de crear usuarios*/
    const handleInputChange = (e) => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

    }

    /*Función para convertir la URL del adjunto que suben al formulario de crear usuarios en base64 y almacenarlo en el estado global*/
    const getUrlUpdateUser = async () => {

        const fileInput = document.getElementById('url_img_usuario2');
        const selectedFile = fileInput.files[0];
        const btn = document.getElementsByClassName('btnEditarUsuario');

        if (selectedFile.type != "image/png" && selectedFile.type != "image/jpeg" && selectedFile.type != "image/jpg") {
            //console.log('LLEGO');
            alert("Solo se permiten imágenes en PDF, JPG y JPEG")
            fileInput.value = "";
            //console.log(btn[0])
            btn[0].setAttribute('disabled', 'true');
        } else {
            btn[0].removeAttribute('disabled');
            let result = await useGetBase64(selectedFile);
            let url = result;
            //console.log(url)
            setDatos({
                ...datos,
                ['url_img_usuario']: url
            })
        }
    }

    /*Función que actualiza cual item de la lista desplegable es seleccionado*/
    const handleSelectChange = (value) => {

        setDatos({
            ...datos,
            ['estado_usuario']: value
        })

    };

    /*Función que muestra una notificación cuando se ha logrado actualizar un usuario*/
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: '¡Usuario actualizado correctamente!',
            description:
                'Los datos ingresados han sido recibidos :)',
        });
    };

    /*Función que muestra una notificación cuando se ha logrado eliminar un usuario*/
    const openNotificationWithIconDelete = (type) => {
        notification[type]({
            message: '¡Usuario eliminado correctamente!',
            description:
                'El usuario ha sido desterrado :)',
        });
    };

    /*Función que muestra un modal con la información del usuario*/
    const openUser = (e) => {

        let idUserVer = e.target.id;
        localStorage.setItem('idUserVer', idUserVer);

        getUsers(idUserVer);

        setVisibleVerUsuario(true)

    }

    /*Función quecierra un modal con la información del usuario*/
    const handleCancelUser = () => {
        setVisibleVerUsuario(false);
    };

    /*Función que muestra un modal para confirmar que se quiere eliminar un usuario*/
    const showDeleteConfirm = async (e) => {

        let idUserDel = getIdDelete(e);

        confirm({
            title: '¿Estás seguro de eliminar este usuario?',
            icon: <ExclamationCircleOutlined />,
            content: 'Este cambio es permanente ',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteUsers(idUserDel);
            },
        });
    };

    /*Función y objetos del antd requeridos para el uso del componente Upload*/
    const props = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        }
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e.fileList;
        }

        return e.fileList;
    };


    return (
        <>
            <div id={id} className="cardUser">

                <li class="ant-list-item"><div class="ant-list-item-meta">
                    <div class="ant-list-item-meta-avatar">
                        <span class="ant-avatar ant-avatar-circle ant-avatar-image">
                            <img src={url} />
                        </span>
                    </div>
                    <div class="ant-list-item-meta-content">
                        <h4 class="ant-list-item-meta-title" >
                            <a onClick={openUser} id={id}>{nombre}</a>
                        </h4>
                    </div>
                    <div class="ant-list-item-meta-content">
                        <div class="ant-list-item-meta-description correo">{correo}</div>
                    </div>
                    <div class="ant-list-item-meta-content">
                        <div class="ant-list-item-meta-description telefono">{telefono}</div>
                    </div>

                </div>
                    <div className={estado == 1 ? 'activo' : 'deshabilitado'}>{estado == 1 ? 'Activo' : 'Deshabilitado'}</div>
                    <ul class="ant-list-item-action">
                        <li>
                            <div >

                                <svg className='editar' onClick={openEditUser} id={id} viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path id={id} d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>

                            </div>
                        </li>
                        <li>
                            <div>
                                {
                                    idUser == id ? <svg className='eliminar_bloqueado' viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true" data-darkreader-inline-fill="" ><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
                                        :
                                        <svg className='eliminar' onClick={showDeleteConfirm} id={id} viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true" data-darkreader-inline-fill="" ><path id={id} d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>

                                }
                            </div>
                        </li>
                    </ul>
                </li>
            </div>

            <Modal
                visible={visible}
                title="Editar usuario"
                onCancel={handleCancel}
                width="800px"
                footer={[


                ]}
            >

                <Form {...layout} form={form} name="editarUsuario" className="editarUsuario" id="editarUsuario" onFinish={updateUsers}>

                    <Row className='d-flex align-items-center justify-content-center foto_perfil'>
                        <Form.Item
                            name="url_img_usuario2"
                            label=""
                            valuePropName="fileList"
                            onChange={getUrlUpdateUser}
                            getValueFromEvent={normFile}
                        >
                            <Upload name="url_img_usuario2" listType="picture" {...props} maxCount={1} id="url_img_usuario2" accept="image/png, image/jpeg, image/jpg">
                                <Button icon={<UploadOutlined />}>Foto de perfil</Button>
                            </Upload>
                        </Form.Item>
                    </Row>

                    <Row className='col-12 d-flex flex-column align-items-center'>
                        <div className='d-flex justify-content-center'>
                            <Col span={12} className="m-3">
                                <Form.Item name="nombre_usuario" label="Nombre" className="d-flex flex-column">
                                    <Input type="text" onChange={handleInputChange} name="nombre_usuario" />
                                </Form.Item>
                                <Form.Item name="estado_usuario" label="Estado" className="d-flex flex-column">


                                    <Select required
                                        defaultValue='Seleccione:'
                                        onChange={handleSelectChange}
                                        placeholder=""
                                        allowClear
                                        name="estado_usuario"
                                    >

                                        <Option key="1" value="1">Activo</Option>
                                        <Option key="2" value="0">Deshabilitado</Option>


                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} className="m-3">
                                <Form.Item name="telefono_usuario" label="Teléfono" className="d-flex flex-column" id="telefono_usuario">
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
                            <Button type="primary" htmlType="submit" loading={loading} className="btnEditarUsuario">
                                Actualizar
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>


            <Modal
                visible={visibleVerUsuario}
                title="Ver usuario"
                onCancel={handleCancelUser}
                width="800px"
                footer={[

                ]}
            >




                {
                    !users ? 'Cargando...' :
                        <>
                            <div className='d-flex justify-content-center align-items-center imgUser m-2'>
                                <img src={users.url_img_usuario} />
                            </div>
                            <table className='tableUser table table-bordered'>
                                <thead>
                                    <tr>
                                        <th scope="col">Campo</th>
                                        <th scope="col">Información</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Nombre</td>
                                        <td>{users.nombre_usuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Documento</td>
                                        <td>{users.documento_usuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Correo</td>
                                        <td>{users.correo_usuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Teléfono</td>
                                        <td>{users.telefono_usuario == null ? 'Sin información' : users.telefono_usuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de nacimiento</td>
                                        <td>{users.fecha_nacimiento_usuario == null ? 'Sin información' : users.fecha_nacimiento_usuario.split('T')[0]}</td>
                                    </tr>
                                    <tr>
                                        <td>Rol</td>
                                        <td>{users.nombre_rol == null ? 'Sin información' : users.nombre_rol}</td>
                                    </tr>
                                    <tr>
                                        <td>Estado</td>
                                        <td>{users.nombre_estado == null || users.nombre_estado == undefined ? 'Sin información' : users.nombre_estado}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </>
                }

            </Modal>

        </>
    )

}

export default CardUser;

