import React from "react";
import style from './TypeDiets.module.css';

export default function TypeDiets({ diets }) {
    return (
        <div className={style.container}> 
            { 
                diets?.map( (el, i) => validateDiet(el, i) )
            } 
        </div>
    )
}

const validateDiet = (diet, i) => {
    switch(diet) {
        case "Sin gluten":
        case "Libre de lácteos":
        return <span key={i} className={style.badgeRed}>{diet}</span> ;
        case "Vegano":
        case "Lacto ovo vegetariano":
        case "Vegetariano":
        return <span key={i} className={style.badgeGreen}>{diet}</span>;
        case "Paleolítico":
        case "primitivo":
        return <span key={i} className={style.badgePurple}>{diet}</span>;
        default:
        return <span key={i} className={style.badgeCyan}>{diet}</span> ;
    }
}