import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card.jsx";
import Filter from "../Filter/Filter.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import style from './Cards.module.css';

export default function Cards({ recipes }) {
    const [render, setRender] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);
    const recipesPage = 12;
    // const [ recipesPage ] = useState(8);
    const indexOfLastRecipes = currentPage * recipesPage;
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipes, indexOfLastRecipes);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <React.Fragment>
            <Filter pagination={pagination} setRender={setRender} />
            {
                <div className={style.container}>
                    {
                        (currentRecipes.length > 0) && <Pagination currentPage={currentPage}
                                                             recipesPage={recipesPage} 
                                                             recipes={recipes.length} 
                                                             pagination={pagination} />
                    }
                    <div className={style.cards}>
                    {
                        (currentRecipes.length > 0) 
                            ? currentRecipes?.map( (el) => {
                                return <Card key={el.id} 
                                             id={el.id} 
                                             name={el.name} 
                                             image={el.image} 
                                             healthScore={el.healthScore} 
                                             diets={el.diets}/>
                            })
                            : <h2>No hay recetas disponibles</h2> 
                    }
                    </div> 
                </div>
            }
        </React.Fragment>
    )
}