import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'

import ModulesRouter from '../../modules';
import ErrorView from '../../security/views/error';
import LoginView from '../../security/views/login';


const MainRouter = ({ location }) => {
    console.log(location);
    if (location === '/') {
        return <Navigate to={'login'} />;
    }

    return (
        <Routes>
           
            <Route path='login' element={<LoginView />} />
        </Routes>

    )

}

export default MainRouter;