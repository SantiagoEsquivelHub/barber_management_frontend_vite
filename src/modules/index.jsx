
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '../containers/sidebar';
import DashboardRouter from './dashboard/views/mainView';




const ModulesRouter = ({ history, match }) => {

    return (
        <AutContainer history={history}>
            {user &&
                <>
                    <Sidebar history={history} />
                    <main>
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
                            <Route path={`${match.url}/dashboard`} component={DashboardRouter} />
                            {
                                // ValidateRoles([1], user) &&
                                <Route path={`${match.url}/staff`} component={StaffRouter} />
                            }
                            {
                                //ValidateRoles([1, 2, 3, 4, 5, 6, 7, 8], user) &&
                                <Route path={`${match.url}/users`} component={UsersRouter} />
                            }
                            <Redirect to="/error" />
                        </Switch>
                    </main>
                </>
            }
        </AutContainer>
    )
}

export default ModulesRouter;