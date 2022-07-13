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

    const urlEditarUsuario = `http://${document.domain}:3001/roles/`;
    const urlEliminarUsuario = `http://${document.domain}:3001/usuario/`;

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

        setUser(data);

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
        console.log(res)
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


    const props = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
    }

    const getUrl = async () => {
        const fileInput = document.getElementById('url_img_usuario');
        const selectedFile = fileInput.files[0];

        let result = await getBase64(selectedFile);
        let url = result;

        setDatos({
            ...datos,
            [fileInput.id]: url
        })
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
                        <li onClick={showModal}>
                            <a><EditOutlined /></a>
                            <em class="ant-list-item-action-split">
                            </em>
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

                <Form {...layout} form={form} name="editarUsuario" className="editarUsuario" id="editarUsuario" onFinish={handleOk}>

                    <Row className='d-flex align-items-center justify-content-center foto_perfil'>
                        <Form.Item
                            name="url_img_usuario"
                            label=""
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            onChange={getUrl}
                            rules={[{ required: true }]}
                        >
                            <Upload name="url_img_usuario" listType="picture" {...props} maxCount={1} id="url_img_usuario" >
                                <Button icon={<UploadOutlined />}>Foto de perfil</Button>
                            </Upload>
                        </Form.Item>
                    </Row>

                    <Row className='col-12 d-flex flex-column align-items-center'>
                        <div className='d-flex justify-content-center'>
                            <Col span={12} className="m-3">
                                <Form.Item name="nombre_usuario" label="Nombre" rules={[{ required: true }]} className="d-flex flex-column">
                                    <Input type="text" onChange={handleInputChange} name="nombre_usuario" />
                                </Form.Item>
                                <Form.Item name="nombre_usuario" label="Estado" rules={[{ required: true }]} className="d-flex flex-column">


                                    <Select required
                                        defaultValue='Seleccione:'
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
                                <Form.Item name="telefono_usuario" label="Teléfono" rules={[{ required: true }]} className="d-flex flex-column">
                                    <Input type="text" onChange={handleInputChange} name="telefono_usuario" />
                                </Form.Item>
                            </Col>
                        </div>
                    </Row>
                    <div className='d-flex justify-content-center'>
                        <Form.Item >
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>,
                            <Button type="primary" htmlType="submit" loading={loading}>
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