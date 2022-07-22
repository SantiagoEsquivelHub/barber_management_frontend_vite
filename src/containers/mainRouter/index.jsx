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

    const [token, setToken] = useState();
    const tokenLocal = localStorage.getItem('token');
    let rol = localStorage.getItem('rol');
    let id = localStorage.getItem('id');
    let ruta = `/staff/${id}`
    if (!token && tokenLocal == undefined) {
      return <LoginView setToken={setToken} />
    }

    if (rol == 'Administrador' && location.pathname === '/') {
        return <Navigate to='/main' />;
    }

    if (rol == 'Barbero' && location.pathname === '/') {
        return <Navigate to={ruta} />;
    }

    

    return (
        <>
           <Sidebar setToken={setToken}/>
            
                <Routes>
                    <Route path='/main'  element={rol == 'Barbero' ? (<ErrorView />) : <DashboardRouter />} />
                    <Route path='/staff' element={rol == 'Barbero' ? (<ErrorView />) :<StaffView />} />
                    <Route path='/staff/:id' element={<StaffUserView />} />
                    <Route path='/users' element={rol == 'Barbero' ? (<ErrorView />) :<UsersView />} />
                    <Route path='/*' element={<ErrorView />} />
                </Routes>
            
        </>
    )

}

export default MainRouter;