
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../containers/sidebar';
import DashboardRouter from './dashboard/views/mainView';




const ModulesRouter = ({ history, match }) => {

    return (
        <>
  {/*  <AutContainer history={history}> */}
            
                <>
                    <Sidebar  />
                    <main>
                        <Routes>

                            <Route path={`${match.url}/dashboard`} component={DashboardRouter} />
                           {/*  {
                                // ValidateRoles([1], user) &&
                                <Route path={`${match.url}/staff`} component={} />
                            }
                            {
                                //ValidateRoles([1, 2, 3, 4, 5, 6, 7, 8], user) &&
                                <Route path={`${match.url}/users`} component={} />
                            } */}
                          

                        </Routes>
                    </main>
                </>

       {/*  </AutContainer> */}
        </>
    )
}

export default ModulesRouter;