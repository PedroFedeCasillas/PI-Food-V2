import React from 'react';
import style from './Loading.module.css';

export default function Loading() {
    return (
        <div className={style.loading}>
                <div class={style.loadingSpiner}></div>
                <p>Cargando información...</p>
            </div>
    )
}