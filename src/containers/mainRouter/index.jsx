import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'
import DashboardRouter from '../../modules/dashboard/views/mainView';
import StaffView from '../../modules/staff/view/main';
import StaffUserView from '../../modules/staff/view/staffUser';
import UsersView from '../../modules/users';
import ErrorView from '../../security/views/error';
import LoginView from '../../security/views/login';
import Sidebar from '../sidebar';

const MainRouter = ({ location }) => {

    /*Estados generales para recepción del token*/
    const [token, setToken] = useState();
    const tokenLocal = localStorage.getItem('token');

    /*Variables globales*/
    let rol = localStorage.getItem('rol');
    let id = localStorage.getItem('id');
    let ruta = `/staff/${id}`

    /*Si no tenemos un token, significa que el usuario no puede ingresar al software y lo redireccionamos al Login*/
    if (!token && tokenLocal == undefined) {
        return <LoginView setToken={setToken} />
    }

    /*Si el rol del usuario es Administrador, entonces lo redireccionamos al Dashboard*/
    if (rol == 'Administrador' && location.pathname === '/') {
        return <Navigate to='/main' />;
    }

    /*Si el rol del usuario es Barbero, entonces lo redireccionamos a su respectiva interna*/
    if (rol == 'Barbero' && location.pathname === '/') {
        return <Navigate to={ruta} />;
    }

    return (
        <>
            {/* Componente SideBar, el cual nos permite navegar entre los módulos*/}
            <Sidebar setToken={setToken} />

            {/* Rutas principales condicionadas según el rol del usuario, si algún barbero trata de entrar a una sección que no le corresponde, no se le cargará la información */}
            <Routes>
                <Route path='/main' element={rol == 'Barbero' ? (<ErrorView />) : <DashboardRouter />} />
                <Route path='/staff' element={rol == 'Barbero' ? (<ErrorView />) : <StaffView />} />
                <Route path='/staff/:id' element={<StaffUserView />} />
                <Route path='/users' element={rol == 'Barbero' ? (<ErrorView />) : <UsersView />} />
                <Route path='/*' element={<ErrorView />} />
            </Routes>

        </>
    )

}

export default MainRouter;