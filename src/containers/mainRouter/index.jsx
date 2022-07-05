import { Switch, Route, Redirect } from 'react-router-dom'

import ModulesRouter from '../../modules';
import ErrorView from '../../security/views/error';
import LoginView from '../../security/views/login';
ModulesRouter


const MainRouter = ({ location }) => {

    if (location.pathname === '/') {
        return <Redirect to={'/app'} />;
    }

    return (
        <Switch>

            <Route path='/app' component={ModulesRouter} />
            <Route path='/error' component={ErrorView} />
            <Route path='/login' component={LoginView} />
            <Redirect to='/error' />
            
        </Switch>

    )

}

export default MainRouter;