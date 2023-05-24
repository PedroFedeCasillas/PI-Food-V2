import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css';
import logo from './../../assets/LandingPage/foodpiTitle.png';

const LandingPage = () => {
    return (
        <div className={style.BgContainer}>
        
        <div className={style.TitleContainer}>
          <p className={style.SubTitles}>Bienvenidos a</p>
          <img src={logo} alt="logo"  className={style.logo}/> 
          <p className={style.SubTitles}>Pedro Fede Casillas</p>
          <Link to="/home">
          <button className={style.EnterBtn}>INICIO</button>         
           </Link>
                  
        </div>
        
      </div>
    )
};

export default LandingPage;