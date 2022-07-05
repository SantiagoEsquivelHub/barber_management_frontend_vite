import React from 'react'
import ReactDOM from 'react-dom/client'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import MainRouter from './containers/mainRouter/index'


const App = () => {
  return (
    <Fragment>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={MainRouter} />
          </Switch>
        </BrowserRouter>
    </Fragment>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App  />
  </React.StrictMode>
)
