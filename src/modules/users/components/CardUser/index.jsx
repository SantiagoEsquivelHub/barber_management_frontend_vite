import React from 'react'

export const CardUser = ({ nombre, correo, telefono, estado, url, id }) => {
    return (
        <div>
          
            <li class="ant-list-item"><div class="ant-list-item-meta">
                <div class="ant-list-item-meta-avatar">
                    <span class="ant-avatar ant-avatar-circle ant-avatar-image">
                        <img src={url} />
                    </span>
                </div>
                <div class="ant-list-item-meta-content">
                    <h4 class="ant-list-item-meta-title">
                        <a href="#">{nombre}</a>
                    </h4>
                </div>
                <div class="ant-list-item-meta-content">
                    <div class="ant-list-item-meta-description">{correo}</div>
                </div>
                <div class="ant-list-item-meta-content">
                    <div class="ant-list-item-meta-description">{telefono}</div>
                </div>
            </div>
                <div>{estado == 1 ? 'Activo' : 'Desactivado'}</div>
                <ul class="ant-list-item-action">
                    <li>
                        <a>edit</a>
                        <em class="ant-list-item-action-split">
                        </em>
                    </li>
                    <li>
                        <a>more</a>
                    </li>
                </ul>
            </li>
        </div>
    )
}

export default CardUser;