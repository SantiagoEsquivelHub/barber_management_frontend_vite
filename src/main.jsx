import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
//import AuthContainer from './containers/auth'

import MainRouter from './containers/mainRouter/index'
import Sidebar from './containers/sidebar'
import DashboardRouter from './modules/dashboard/views/mainView'
import StaffView from './modules/staff/view/main'
import StaffUserView from './modules/staff/view/staffUser'
import ErrorView from './security/views/error'
import LoginView from './security/views/login'


const App = () => {
  return (

    <Router>
      <Sidebar />
      <Routes>
        <Route path='/' element={<MainRouter location="/" />} />
        <Route path='login' element={<LoginView />} />
        <Route path='main' element={<DashboardRouter />} />
        <Route path='staff' element={<StaffView />} />
        <Route path='staff/:id' element={<StaffUserView />} />
        <Route path='*' element={<ErrorView />} />
      </Routes>
    </Router>

  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <App />

  </React.StrictMode>
)
