import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from './About.module.css';
import { TbWorld } from "react-icons/tb";
import {
    DiReact,
    DiJavascript1,
    DiPostgresql,
    DiCss3,
    DiHtml5,
} from "react-icons/di";
import {
    SiRedux,
    SiSequelize,
    SiExpress,
    SiNodedotjs,
    SiLinkedin,
    SiGithub,
} from "react-icons/si";

export default function About() {

    const countAllRecipes = useSelector((state) => state.allRecipes.length);
    const [lenguage, setLenguage] = useState('ES');
    const handleClick = (e) => {
        e.preventDefault();
        if(lenguage === 'ES') {
            setLenguage('EN');
        } else {
            setLenguage('ES');
        }
    }

    return (
        <div className={style.container}>
            <button className={style.lenguage} onClick={ (e) => handleClick(e) }>
                <TbWorld className={style.lenguage_icon} />
            </button>
            {
                (lenguage === 'ES')
                ? <div className={style.container_about}>
                    <div className={style.container_title}>   
                        <h1 className={style.title}>Food</h1>
                    </div>
                    <p className={style.description}>
                        <b>Single-Page Application</b> se desarrolló como una evaluación individual para el Bootcamp <b>"Soy Henry"</b>.
                        La idea general es crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa spoonacular y a partir de ella poder, entre otras cosas: 
                        <b> Buscar recetas; Filtrarlos / Ordenarlos; Crear, Editar, Eliminar recetas.</b> 
                    </p>

                    <h4>Recetas actuales:</h4>
                    <div className={style.box}>
                        <span className={style.counter}>{countAllRecipes}</span>
                    </div>

                    <h4>Fue creado con las siguientes tecnologías:</h4>
                    <div className={style.tech_list}>
                        <li>
                        <DiReact className={style.react_icon} />
                        React
                        </li>
                        <li>
                        <SiRedux className={style.react_icon} /> Redux
                        </li>
                        <li>
                        {" "}
                        <DiJavascript1 className={style.react_icon} /> Javascript
                        </li>
                        <li>
                        <SiSequelize className={style.react_icon} />
                        Sequelize
                        </li>
                        <li>
                        <DiPostgresql className={style.react_icon} />
                        PostgreSQL
                        </li>
                        <li>
                        <DiCss3 className={style.react_icon} />
                        Css
                        </li>
                        <li>
                        <DiHtml5 className={style.react_icon} />
                        Html
                        </li>
                        <li>
                        <SiExpress className={style.react_icon} />
                        Express
                        </li>
                        <li>
                        <SiNodedotjs className={style.react_icon} />
                        Node.js
                        </li>
                    </div>
                    <hr/>
                    
                    <div className={style.about_pages}>
                        <a href="https://www.linkedin.com/in/pedro-fede-casillas-b73778165/"
                            target="_blank"
                            rel="noreferrer">
                            <SiLinkedin className={style.social_links_icons} color="#0A66C2" />
                        </a>
                        <a href="https://github.com/PedroFedeCasillas"
                            target="_blank"
                            rel="noreferrer">
                            <SiGithub className={style.social_links_icons} color="black" />
                        </a>
                    </div>
                    <small className={style.dev}>Diseñado por Pedro Fede Casillas</small> 
                </div>
                : <div className={style.container_about}>
                    <div className={style.container_title}>   
                        <h1 className={style.title}>Food</h1>
                    </div>
                    <p className={style.description}>
                        <b>Single-Page Application</b> was developed as an individual assessment for the <b>"Soy Henry"</b> Bootcamp.
                        The general idea is to create an application in which you can see different food recipes along with relevant information about them using the spoonacular external api and from it you can, among other things:
                        <b> Search recipes; Filter / Sort them; Create, Edit, Delete recipes.</b> 
                    </p>

                    <h4>Current recipes:</h4>
                    <div className={style.box}>
                        <span className={style.counter}>{countAllRecipes}</span>
                    </div>

                    <h4>It was created with the following technologies:</h4>
                    <div className={style.tech_list}>
                        <li>
                        <DiReact className={style.react_icon} />
                        React
                        </li>
                        <li>
                        <SiRedux className={style.react_icon} /> Redux
                        </li>
                        <li>
                        {" "}
                        <DiJavascript1 className={style.react_icon} /> Javascript
                        </li>
                        <li>
                        <SiSequelize className={style.react_icon} />
                        Sequelize
                        </li>
                        <li>
                        <DiPostgresql className={style.react_icon} />
                        PostgreSQL
                        </li>
                        <li>
                        <DiCss3 className={style.react_icon} />
                        Css
                        </li>
                        <li>
                        <DiHtml5 className={style.react_icon} />
                        Html
                        </li>
                        <li>
                        <SiExpress className={style.react_icon} />
                        Express
                        </li>
                        <li>
                        <SiNodedotjs className={style.react_icon} />
                        Node.js
                        </li>
                    </div>
                    <hr/>
                    
                    <div className={style.about_pages}>
                        <a href="https://www.linkedin.com/in/pedro-fede-casillas-b73778165/"
                            target="_blank"
                            rel="noreferrer">
                            <SiLinkedin className={style.social_links_icons} color="#0A66C2" />
                        </a>
                        <a href="https://github.com/PedroFedeCasillas"
                            target="_blank"
                            rel="noreferrer">
                            <SiGithub className={style.social_links_icons} color="black" />
                        </a>
                    </div>
                    <small className={style.dev}>Desing by Pedro Fede Casillas</small>
                </div>
            }
        </div>    
    )
}