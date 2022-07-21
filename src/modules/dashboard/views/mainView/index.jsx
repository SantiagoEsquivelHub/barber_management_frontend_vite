
import '../../../../components/style/global.css'
import {
    Modal,
    Form,
    Input,
    Select,
    Button,
    Col,
    Row,
    Upload,
    notification,
    Result
} from 'antd';

const DashboardRouter = () => {


    return (
        <div className='contenedor_main'>
            <h1>
                Dashboard
            </h1>

            <div className='d-flex justify-content-around mb-3'>

                <Button type="primary" className="btnAgregarUsuario">
                    Añadir usuario
                </Button>

            </div>

        </div>
    );
}

export default DashboardRouter;