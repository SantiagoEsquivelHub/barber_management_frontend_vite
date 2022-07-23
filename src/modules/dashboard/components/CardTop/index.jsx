import React from 'react'
import iconBarber from '../../../../assets/images/icono.png'
import './CardTop.css';

/*Componente usado para mostrar cada uno de los barberos del top de los 3 mejores barberos, solo muestra el nombre, la imagen y el número de servicios por el mes*/

const CardTop = ({ nombre, url, numServicios, id }) => {
    return (
        <div>
            <div id={id} className="cardTop">

                <li className="ant-list-item"><div class="ant-list-item-meta">
                    <div className="ant-list-item-meta-avatar">
                        <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                            <img src={url} />
                        </span>
                    </div>
                    <div className="ant-list-item-meta-content">
                        <h4 className="ant-list-item-meta-title" >
                            <a href={`/staff/${id}`} id={id}>{nombre}</a>
                        </h4>
                    </div>
                    <div className="ant-list-item-meta-content">
                        <div className="ant-list-item-meta-description">{numServicios == 1 ? '1 servicio en mes' : `${numServicios} servicios en mes`}</div>
                    </div>
                </div>
                    <ul className="ant-list-item-action">
                        <li>
                            <img src={iconBarber} className="icono_barber" />
                        </li>
                    </ul>
                </li>
            </div>
        </div>
    )
}
export default CardTop;
