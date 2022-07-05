import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
//import AuthContainer from './containers/auth'

import MainRouter from './containers/mainRouter/index'
import ModulesRouter from './modules'
import ErrorView from './security/views/error'
import LoginView from './security/views/login'


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<MainRouter location="/"/>} />
        <Route path='login' element={<LoginView />} />
        <Route path='app' element={<ModulesRouter />} />
         <Route path='error' element={<ErrorView />} />
      </Routes>
    </Router>

  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <App />

  </React.StrictMode>
)
