import { useState } from "react";
import { notification } from 'antd';
import axios from "axios";
import './login.css';



/*Componente usado para validar el ingreso de usuarios*/

const LoginView = ({ setToken }) => {

    /*Estados generales para recepción de datos del usuario*/
    const [user, setUser] = useState(false);
    const [datos, setDatos] = useState({
        usuario: "",
        clave: ""
    });

    /*Función para mostrar notificación cuando los datos del usuario para el login son incorrectos*/
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: '¡Credenciales incorrectas!',
            description:
                'Los datos ingresados son incorrectos. Vefifícalos e inténtalo de nuevo :)',
        });
    };

    /*Función para actualizar los datos del usuario cada vez que hace cambios en los inputs del formulario del login*/
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        let newDatos = { ...datos, [name]: value };
        setDatos(newDatos);
    }

    /*Función para enviar los datos ingresados por el usuario para saber si puede ingresar o no*/
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            let res = await axios.post("http://localhost:3001/usuario/login", datos);
            setUser(!user);
            setTimeout(() => {
                const accessToken = res.data.token;
                setToken(accessToken);
                localStorage.setItem("token", accessToken);
                setDatos({
                    usuario: "",
                    clave: ""
                })
                localStorage.setItem('usuario', res.data.nombre_usuario)
                localStorage.setItem('img', res.data.url_img_usuario)
                localStorage.setItem('rol', res.data.nombre_rol)
                localStorage.setItem('id', res.data.id_usuario)
            }, 1000);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                openNotificationWithIcon('warning');
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
        }
    };

    return (
        <section className="background h-100">
            <div className="h-100">
                <div className="row g-0 align-items-center justify-content-end h-100 px-5 gradient">
                    <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-7 col-sm-9 col-lg-auto sw-lg-70">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Bienvenido</h1>
                                <form onSubmit={handleSubmit} className="needs-validation" noValidate={true} autoComplete="off" aria-label="form-login">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Usuario</label>
                                        <input id="email" type="text" onChange={handleInputChange} value={datos.usuario} className="form-control" name="usuario" required autoFocus />
                                        <div className="invalid-feedback">
                                            Usuario inválido
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="password">Contraseña</label>
                                        </div>
                                        <input id="password" type="password" onChange={handleInputChange} value={datos.clave} className="form-control" name="clave" required />
                                        <div className="invalid-feedback">
                                            Contraseña es requirida
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">

                                        <button type="submit" className="btn btn-primary">
                                            <i className="bi bi-box-arrow-in-right"></i> Ingresar
                                        </button>
                                        <div className={user ? "text-center" : "cargando"}>
                                            <div className="spinner-grow text-warning" role="status">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer py-3 border-0">
                                <div className="text-center">
                                    Todos los derechos reservados &copy; 2022
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginView;