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
    if (!token && tokenLocal == undefined) {
      return <LoginView setToken={setToken} />
    }

    if (location.pathname === '/') {
        return <Navigate to='/main' />;
    }

    return (
        <>
           <Sidebar setToken={setToken}/>
            
                <Routes>
                    <Route path='/main' element={<DashboardRouter />} />
                    <Route path='/staff' element={<StaffView />} />
                    <Route path='/staff/:id' element={<StaffUserView />} />
                    <Route path='/users' element={<UsersView />} />
                   {/*  <Route path='/*' element={<ErrorView />} /> */}
                </Routes>
            
        </>
    )

}

export default MainRouter;