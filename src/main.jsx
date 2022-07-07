import React from 'react';
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter as Router, Navigate, useLocation } from 'react-router-dom'
import MainRouter from './containers/mainRouter/index'
import Sidebar from './containers/sidebar'
import DashboardRouter from './modules/dashboard/views/mainView'
import StaffView from './modules/staff/view/main'
import StaffUserView from './modules/staff/view/staffUser'
import ErrorView from './security/views/error'
import LoginView from './security/views/login'


const App = () => {

  const location = useLocation();


  return (

  
      <Routes>
        <Route path='/*' element={<MainRouter />} />
      </Routes>
   /*  */

  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
