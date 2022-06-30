import { Switch, Route, Redirect } from 'react-router-dom'

import LoginView from '../../security/login';
import ErrorView from '../../security/error';
import ModulesRouter from '../../modules';


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