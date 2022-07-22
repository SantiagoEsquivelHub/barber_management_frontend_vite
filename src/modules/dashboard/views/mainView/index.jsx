import React, { useEffect, useState } from 'react';
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
import Card from 'react-bootstrap/Card';
import BarChart from '../../../../components/BarChart';
import CardTop from '../../components/CardTop';




const DashboardRouter = () => {

    const urlDay = `http://${document.domain}:3001/serviciosHoy/0`;
    const urlMonth = `http://${document.domain}:3001/serviciosMes/0`;
    const urlAvg = `http://${document.domain}:3001/serviciosPromedio/0`;
    const urlGrafico = `http://${document.domain}:3001/serviciosMesGrafico/0`;
    const urlTop = `http://${document.domain}:3001/serviciosTop/`;

    let token = localStorage.getItem("token");
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*")

    const [top, setTop] = useState(false);
    const [grafico, setGrafico] = useState(false);
    const [statistics, setStatistics] = useState({
        day: '',
        month: '',
        avg: ''
    });

    const getStatistics = async () => {

        const requestOptions = {
            method: 'GET',
            headers: headers,
        }

        let resDay = await fetch(urlDay, requestOptions);
        let dataDay = await resDay.json();

        let resMonth = await fetch(urlMonth, requestOptions);
        let dataMonth = await resMonth.json();

        let resAvg = await fetch(urlAvg, requestOptions);
        let dataAvg = await resAvg.json();

        setStatistics({
            day: dataDay,
            month: dataMonth,
            avg: dataAvg
        })
    }

    const getDiagram = async () => {
        const requestOptions = {
            method: 'GET',
            headers: headers,
        }

        let res = await fetch(urlGrafico, requestOptions);
        let data = await res.json();
        setGrafico(data);
    }

    const getTop = async () => {
        const requestOptions = {
            method: 'GET',
            headers: headers,
        }

        let res = await fetch(urlTop, requestOptions);
        let data = await res.json();
        setTop(data);
    }

    useEffect(() => {

        getStatistics();
        getDiagram();
        getTop();
    }, [])


    return (
        <div className='contenedor_main'>
            <h1>
                Dashboard
            </h1>

            <div className='d-flex justify-content-around  mb-3'>
                <div className='d-flex flex-column col-6 mb-3'>
                    {
                        !grafico ? 'Cargando...' :
                            <Card className='m-3' >
                                <Card.Body >
                                    <BarChart data={grafico} />
                                </Card.Body>
                            </Card>
                    }

                    <div className='d-flex justify-content-center flex-column align-items-center'>
                        <h4>Top 3 Mejores barberos</h4>
                        <div className='col-8'>
                            {
                                !top ? 'Cargando...' :
                                    top.map((top) => {
                                        return <CardTop nombre={top.nombre_usuario} url={top.url_img_usuario} numServicios={top.count} id={top.id_usuario} />
                                    })
                            }
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-column col-4'>
                    <div className='d-flex justify-content-center flex-column align-items-center'>
                        <Card className='m-3 col-6' >
                            <Card.Body>
                                <div className='d-flex justify-content-center align-items-center card_info mb-2'>{statistics.day}</div>
                                <Card.Text className='d-flex justify-content-center align-items-center card_text'>
                                    Citas registradas hoy
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='m-3 col-6' >
                            <Card.Body>
                                <div className='d-flex justify-content-center align-items-center card_info mb-2'>{statistics.month}</div>
                                <Card.Text className='d-flex justify-content-center align-items-center card_text'>
                                    Total de citas en el mes
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='m-3 col-6' >
                            <Card.Body>
                                <div className='d-flex justify-content-center align-items-center card_info mb-2'>{statistics.avg}</div>
                                <Card.Text className='d-flex justify-content-center align-items-center card_text'>
                                    Promedio de citas por día
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>


                </div>

            </div>

        </div>
    );
}

export default DashboardRouter;