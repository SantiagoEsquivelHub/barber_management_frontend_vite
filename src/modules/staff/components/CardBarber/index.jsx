import React from 'react'
import iconBarber from '../../../../assets/images/icono.png'


 const CardBarber = ({ nombre, correo, telefono, estado, url, id }) => {
    return (
        <div>
            <div id={id} className="cardBarber">

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
                        <div className="ant-list-item-meta-description correo">{correo}</div>
                    </div>
                    <div className="ant-list-item-meta-content">
                        <div className="ant-list-item-meta-description telefono">{telefono}</div>
                    </div>
                </div>
                    <div className={estado == 1 ? 'activo' : 'deshabilitado'}>{estado == 1 ? 'Activo' : 'Deshabilitado'}</div>
                    <ul className="ant-list-item-action">
                        <li>
                            <img src={iconBarber} className="icono_barber"/>
                        </li>
                    </ul>
                </li>
            </div>
        </div>
    )
}
export default CardBarber;
