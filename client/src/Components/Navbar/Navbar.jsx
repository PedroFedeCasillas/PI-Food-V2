import React from "react";
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

const NavBar = () => {

    return (
        <div className={style.container}>
            <nav className={style.navbar}>
                <div className={style.items}>
                    <NavLink to='/' className={style.logo}>FoodPI🍑</NavLink>
                    <NavLink to='/home' className={style.item}>Home</NavLink>
                    <NavLink to='/home/about' className={style.item}>About</NavLink>
                    <NavLink to='/home/create' className={`${style.item} ${style.item_create}`}>
                    Crear Receta
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;