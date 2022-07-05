import { useState, useContext } from "react";
import axios from "axios";
import './login.css';
//import AuthContext from "../../../containers/auth";

const LoginView = () =>{

 

  const [datos, setDatos] = useState({
    usuario: "",
    clave: ""
  });

  const handleInputChange = (e) =>{
    let { name, value } = e.target;
    let newDatos = {...datos, [name]: value};
    setDatos(newDatos);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!e.target.checkValidity()){
      console.log("no enviar");
    }else{
      let res = await axios.post("http://localhost:3001/usuario/login",datos);
      const accessToken = res.token;
      setAuth({usuario, clave, accessToken})
      console.log(res.data);
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
                          <form onSubmit={handleSubmit} className="needs-validation" noValidate={true} autoComplete="off">
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
                              <div className="d-flex align-items-center">

                                  <button type="submit" className="btn btn-primary">
                                      <i className="bi bi-box-arrow-in-right"></i> Ingresar
                                  </button>
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