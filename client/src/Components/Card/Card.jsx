import React from "react";
import { NavLink } from 'react-router-dom'
import TypeDiets from "../TypeDiets/TypeDiets";
import style from './Card.module.css';

export default class Card extends React.Component {
    render() {
        return (
            <div className={style.card}>
                <div>
                    <img src={this.props.image} 
                        onError={ (e) => e.target.src = 'https://imgur.com/fqmPwAc.png' } 
                        className={style.img} 
                        alt={this.props.title} />
                    <h5 className={style.score}>
                    Puntuación de salud: <i>{this.props.healthScore}</i>
                    </h5>
                    <h2 className={style.title}>
                        {this.props.name}
                    </h2>
                    <TypeDiets diets={this.props.diets} /> 
                </div>
                <NavLink to={`/home/recipe/${this.props.id}`} className={style.btn}>Más detalles</NavLink>
            </div>            
        )
    }
}

