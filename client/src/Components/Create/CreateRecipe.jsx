import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import TypeDiets from "../TypeDiets/TypeDiets.jsx";
import { getAllRecipes, getDiets, getRecipeById, postRecipe, updateRecipe } from './../../redux/actions/index.js';
import Swal from 'sweetalert2';
import style from './CreateRecipe.module.css';

export default function CreateRecipe() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector( (state) => state.diets );
    const recipeUpdate = useSelector( (state) => state.recipe );
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        dishTypes: '',
        steps: '',
        image: '',
        diets: []
    });

    useEffect( () => {
        if(Object.keys(recipeUpdate).length) {
            setInput(recipeUpdate);
        }

    }, [recipeUpdate]);
    
    useEffect( () => {
        dispatch(getDiets());
        if(id) {
            dispatch(getRecipeById(id));
        } else {
            setInput({
                name: '',
                summary: '',
                healthScore: 0,
                dishTypes: '',
                steps: '',
                image: '',
                diets: []
            })
        }
    }, [dispatch, id])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleCheck = (e) => {
        const value = e.target.name;
        if(e.target.checked && !input.diets.includes(value)) {
            setInput({
                ...input,
                diets: [...input.diets, value]
            })
        } else {
            setInput({
                ...input,
                diets: input.diets.filter( (d) => d !== value )
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!input.name && !input.summary) {
            // alert('Error en campos obligatorios');
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error en campos obligatorios.',
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            if(id) {
                if(recipeUpdate.createInDB) {
                    dispatch(updateRecipe(input));
                    // alert(`La receta se actualizó con éxito`);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'La receta se actualizó con éxito.',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'no está permitido hacer esta acción.',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    // alert('Error, no está permitido hacer esta acción');
                }
            } else {
                try {
                    let { response } = await dispatch(postRecipe(input));
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'La receta fue creada con éxito.',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    // alert(`La receta fue creada con éxito`);

                } catch(error) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'La receta ya existe...',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    // { alert('La receta ya existe..'); }
                }
            }
            await dispatch(getAllRecipes());
            history.push('/home');
        }
    }

    return (
        <div className={style.container}> 
            <div className={style.card_display}>
                <div className={style.card}>
                    <img src={input.image} 
                    onError={ (e) => e.target.src = 'https://imgur.com/fqmPwAc.png' } 
                    id='img_create' width='300px' alt={input.name} />
                    <h3>Nombre: {input.name}</h3>
                    <h5>Tipos de platos: {input.dishTypes}</h5>
                    <span>Puntuación de salud: {input.healthScore}</span>
                    <div className={style.card_textarea}>Resumen: {input.summary}</div>
                    <div className={style.card_textarea}>Pasos: {input.steps}</div>
                    <TypeDiets diets={input.diets} />
                </div>
            </div>
            <div className={style.form_container}>
                <h1 className={style.title}>Crear receta</h1>
                <form>
                    {
                        errors.name && <span className={style.form_message_error}>{errors.name}</span>
                    }
                    <input type="text" 
                        name="name" 
                        value={input.name} 
                        onChange={ (e) => handleChange(e) }
                        className={`${style.input_box} ${errors.name && style.form_error}`} 
                        placeholder="* Nombre..." />
                    {
                        errors.dishTypes && <span className={style.form_message_error}>{errors.dishTypes}</span>
                    }
                    <input type="text" 
                        name="dishTypes" 
                        value={input.dishTypes} 
                        onChange={ (e) => handleChange(e) }
                        className={style.input_box} 
                        placeholder="Tipos de platos..." />
                    {
                        errors.image && <span className={style.form_message_error}>{errors.image}</span>
                    }
                    <input type="text"
                        name="image" 
                        value={ input.image } 
                        onChange={ (e) => handleChange(e) }
                        className={style.input_box} 
                        placeholder="https://image.png" />
                    {
                        errors.healthScore && <span className={style.form_message_error}>{errors.healthScore}</span>
                    }
                    <input type="number" 
                        name="healthScore" 
                        value={input.healthScore} 
                        onChange={ (e) => handleChange(e) }
                        min='0'
                        max='100'
                        className={`${style.input_box} ${errors.healthScore && style.form_error}`} 
                        placeholder="Puntuación de salud..." />
                    {
                        errors.summary && <span className={style.form_message_error}>{errors.summary}</span>
                    }
                    {
                        errors.steps && <span className={style.form_message_error}>{errors.steps}</span>
                    }
                    <div className={style.form_textarea}>
                        <textarea name="summary" 
                            value={input.summary} 
                            onChange={ (e) => handleChange(e) }
                            className={`${style.input_box} ${errors.summary && style.form_error}`} 
                            cols="30" rows="10" 
                            placeholder="* Resumen..."></textarea>
                        <textarea name="steps" 
                            value={input.steps} 
                            onChange={ (e) => handleChange(e) }
                            className={style.input_box} 
                            cols="30" rows="10" 
                            placeholder="Pasos..."></textarea>
                    </div>

                    <div className={style.type_diets}>
                        {
                            diets?.map( (d) => (
                                <div key={d.id} className={style.diet}>
                                    <input type="checkbox" 
                                        checked={input.diets?.includes(d.name)} 
                                        onChange={ (e) => handleCheck(e) } 
                                        name={d.name} id={d.id} />
                                    <label htmlFor={d.id}>{d.name}</label>
                                </div>
                            ))
                        }
                    </div>
                    {
                        (Object.keys(errors).length === 0 && (input.name && input.summary)) 
                        ? <button type="submit" onClick={ (e) => handleSubmit(e) } className={style.button}>Enviar</button>
                        : null
                    }
                        
                </form>
            </div> 
        </div>
    )
}

const validate = (input) => {
    let errors = {};
    if(!input.name) {
        errors.name = 'El nombre no puede estar vacío';
    }
    else if(input.name?.length > 100) {
        errors.name = 'El nombre no puede tener más de 100 caracteres';
    }

    if(input.image?.length > 150) { 
        errors.image = 'La imagen no puede tener más de 150 caracteres';
    }

    if(input.dishTypes?.length > 100) {
        errors.dishTypes = 'Los tipos de platos no pueden tener más de 100 caracteres';
    }

    if(!input.summary) {
        errors.summary = 'El resumen no puede estar vacío';
    }
    else if(input.summary?.length > 700) {
        errors.summary = 'El resumen no puede exceder los 700 caracteres';
    }

    if(input.steps?.length > 1000) {
        errors.steps = 'Los pasos no pueden exceder los 1000 caracteres';
    }

    if(input.healthScore?.length === 0) {
        errors.healthScore = 'La puntuación de salud no es válida';
    }
    else if(input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = 'La puntuación de salud no puede ser inferior a 0 ni superior a 100';
    }
    else if(input.healthScore?.toString().includes('.')) {
        errors.healthScore = 'El puntaje de salud no puede ser un número decimal';
    }
    
    return errors;
}
