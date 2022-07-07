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
        <Router>

            <Sidebar />

            <Routes>
                <Route path='/' element={<MainRouter location="/" />} />
                <Route path='main' element={<DashboardRouter />} />
                <Route path='*' element={<ErrorView />} />
            </Routes>
        </Router>

    )

}

export default MainRouter;