import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { orderRecipes, filterByDiets, getDiets, cleanRecipe } from "../../redux/actions";
import Search from "../Search/Search";
import style from './Filter.module.css';

const Filter = ({ pagination, setRender }) => {

    const dispatch = useDispatch();
    const diets = useSelector( (state) => state.diets );

    useEffect( () => {
        dispatch(getDiets());
    }, [dispatch])

    const handlerFilterByDiets = (e) => {
        e.preventDefault();
        dispatch(filterByDiets(e.target.value));
        document.getElementById('select-order').value = 'all';
        setRender(`${e.target.value} render`);
        pagination(1);
    }
    
    const handlerOrder = (e) => {
        e.preventDefault();
        dispatch(orderRecipes(e.target.value));
        setRender(`${e.target.value} render`);
        pagination(1);
    }
    
    const handlerClean = (e) => {
        e.preventDefault();
        cleanSelector();
        dispatch(cleanRecipe());
        pagination(1);
    }

    const cleanSelector = () => {
        document.getElementById('select-order').value = 'all';
        document.getElementById('select-diets').value = 'all';
    }
    
    return (
        <div className={style.container} >
            
            <div className={style.container_filter}>
                <select onChange={ (e) => handlerOrder(e) } id='select-order' className={style.filter}>
                    <option value="all">Orden alfabético</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                    <option value="ascScore">Puntuación alta</option>
                    <option value="desScore">Puntuación baja</option>
                </select>

                <Search pagination={pagination} cleanSelector={cleanSelector} />

                <select onChange={ (e) => handlerFilterByDiets(e) } id='select-diets' className={style.filter}>
                    <option value='all'>Todos</option>
                    {
                        diets?.map( (el) => {
                            return <option key={el.id} value={el.name}>{ el.name }</option>
                        })
                    }
                </select>
            </div>
            
            <div className={style.container_btn_clean}>
                <button onClick={ (e) => handlerClean(e) } className={style.btn_clean}>Clear</button>
            </div>
        </div>
    )
}

export default Filter;