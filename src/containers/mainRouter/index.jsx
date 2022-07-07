import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'
import DashboardRouter from '../../modules/dashboard/views/mainView';
import StaffView from '../../modules/staff/view/main';
import StaffUserView from '../../modules/staff/view/staffUser';
import ErrorView from '../../security/views/error';
import LoginView from '../../security/views/login';
import Sidebar from '../sidebar';

const MainRouter = ({ location }) => {

    const [token, setToken] = useState();
    if (!token) {
      return <LoginView setToken={setToken} />
    }

    

    console.log("location", location);
    if (location === '/') {
        return <Navigate to={'/main'} />;
    }

    return (
        <>
           <Sidebar setToken={setToken}/>
            
                <Routes>
                    <Route path='/main' element={<DashboardRouter />} />
                    <Route path='/staff' element={<StaffView />} />
                    <Route path='/staff/:id' element={<StaffUserView />} />
            {/*  */}        <Route path='/*' element={<ErrorView />} />
                </Routes>
            
        </>
    )

}

export default MainRouter;