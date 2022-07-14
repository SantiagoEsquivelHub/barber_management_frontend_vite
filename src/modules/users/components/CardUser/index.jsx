import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
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

const { Option } = Select;

const layout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 50 },
};

export const CardUser = ({ nombre, correo, telefono, estado, url, id }) => {

    const { confirm } = Modal;


    const [user, setUser] = useState(false);
    const [rol, setRol] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const [datos, setDatos] = useState({
        nombre_usuario: '',
        telefono_usuario: '',
        estado_usuario: '',
        url_img_usuario: ''
    })

    const urlEditarUsuario = `http://${document.domain}:3001/editarUsuario/`;
    const urlEliminarUsuario = `http://${document.domain}:3001/eliminarUsuario/`;

    let token = localStorage.getItem("token");
    let headers2 = new Headers();
    headers2.append("Authorization", "Bearer " + token);
    headers2.append("Content-type", "application/json");
    headers2.append("Access-Control-Allow-Origin", "*")
    const updateUsers = async (e) => {
        let idUser = localStorage.getItem('idUser');
  
        const requestOptions = {
            method: 'POST',
            headers: headers2,
            body: JSON.stringify({
                ...datos
            }
            )
        }

        const res = await fetch(urlEditarUsuario + idUser, requestOptions);
        openNotificationWithIcon('success');

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
            onReset();
            localStorage.removeItem('idUser');
            window.location.reload();
        }, 3000);

    }



    /* const getRoles = async (e) => {

        const requestOptions = {
            method: 'GET',
            headers: headers,
        }

        const res = await fetch(urlRol, requestOptions);
        const data = await res.json();
        //console.log("roles", data);
        setRol(data);

    } */

    const getId = (e) => {

        let idUser = e.target.id;
        localStorage.setItem('idUser', idUser);
        console.log(idUser);
        setVisible(true);
    }


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


    const handleInputChange2 = (e) => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

    }


    const props = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
    }

    const getUrl2 = async () => {

        const fileInput = document.getElementById('url_img_usuario2');
        const selectedFile = fileInput.files[0];
        const btn = document.getElementsByClassName('btnEditarUsuario');

        if (selectedFile.type != "image/png" && selectedFile.type != "image/jpeg" && selectedFile.type != "image/jpg") {
            //console.log('LLEGO');
            alert("Solo se permiten imágenes en PDF, JPG y JPEG")
            fileInput.value= "";
            //console.log(btn[0])
            btn[0].setAttribute('disabled', 'true');
        } else {
            btn[0].removeAttribute('disabled');
            let result = await getBase64(selectedFile);
            let url = result;
            //console.log(url)
            setDatos({
                ...datos,
                ['url_img_usuario']: url
            })
        }


    }

    const handleSelectChange = (value) => {

        setDatos({
            ...datos,
            ['estado_usuario']: value
        })


    };


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
        });


    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: '¡Usuario actualizado correctamente!',
            description:
                'Los datos ingresados han sido recibidos :)',
        });
    };




    const showDeleteConfirm = () => {
        confirm({
            title: '¿Estás seguro de eliminar este usuario?',
            icon: <ExclamationCircleOutlined />,
            content: 'Este cambio es permanente ',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
        });
    };


    return (
        <>
            <div id={id}>

                <li class="ant-list-item"><div class="ant-list-item-meta">
                    <div class="ant-list-item-meta-avatar">
                        <span class="ant-avatar ant-avatar-circle ant-avatar-image">
                            <img src={url} />
                        </span>
                    </div>
                    <div class="ant-list-item-meta-content">
                        <h4 class="ant-list-item-meta-title">
                            <a >{nombre}</a>
                        </h4>
                    </div>
                    <div class="ant-list-item-meta-content">
                        <div class="ant-list-item-meta-description">{correo}</div>
                    </div>
                    <div class="ant-list-item-meta-content">
                        <div class="ant-list-item-meta-description">{telefono}</div>
                    </div>
                </div>
                    <div>{estado == 1 ? 'Activo' : 'Deshabilitado'}</div>
                    <ul class="ant-list-item-action">
                        <li onClick={getId} id={id}>
                            <div >
                                {/* <EditOutlined className={id}/> */}
                                <svg id={id} viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path id={id} d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
                                {/*    <FontAwesomeIcon icon="fa-solid fa-user-pen" id={id}/> */}
                            </div>
                        </li>
                        <li onClick={showDeleteConfirm}>
                            <a ><DeleteOutlined /></a>
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
                            getValueFromEvent={normFile}
                            onChange={getUrl2}
                            rules={[{ required: true, message: "Este campo es obligatorio" }]}

                        >
                            <Upload name="url_img_usuario2" listType="picture" {...props} maxCount={1} id="url_img_usuario2" accept="image/png, image/jpeg, image/jpg">
                                <Button icon={<UploadOutlined />}>Foto de perfil</Button>
                            </Upload>
                        </Form.Item>
                    </Row>

                    <Row className='col-12 d-flex flex-column align-items-center'>
                        <div className='d-flex justify-content-center'>
                            <Col span={12} className="m-3">
                                <Form.Item name="nombre_usuario" label="Nombre" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">
                                    <Input type="text" onChange={handleInputChange2} name="nombre_usuario" />
                                </Form.Item>
                                <Form.Item name="estado_usuario" label="Estado" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column">


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
                                <Form.Item name="telefono_usuario" label="Teléfono" rules={[{ required: true, message: "Este campo es obligatorio" }]} className="d-flex flex-column" id="telefono_usuario">
                                    <Input type="text" onChange={handleInputChange2} name="telefono_usuario" />
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
        </>
    )
}

export default CardUser;

