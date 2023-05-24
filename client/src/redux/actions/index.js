import axios from 'axios';
export const GET_DIETS = 'GET_DIETS';
export const POST_RECIPE = 'POST_RECIPE';
export const CLEAN_RECIPE = 'CLEAN_RECIPE';
export const ORDER_RECIPES = 'ORDER_RECIPES';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const FILTER_BY_DIEST = 'FILTER_BY_DIEST';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';


const URL = "http://localhost:3001/";


//=================>>>>Limpiar<<<<=================//
export const cleanRecipe = () => {
    return function(dispatch) {
        return dispatch({ type: CLEAN_RECIPE })
    }
}

//=================>>>>Put = Actualizar<<<<=================//
export const updateRecipe = (recipe) => {
    return async function(dispatch) {
        try {
          axios.put(`${URL}recipes`, recipe);
          return dispatch({ type: UPDATE_RECIPE })  
        } catch(error) {
            console.error(error);
        }
    }
}

//=================>>>>Delete = Eliminar<<<<=================//
export const deleteRecipe = (id) => {
    return async function(dispatch) {
        try {
            axios.delete(`${URL}recipes/${id}`); 
            return dispatch({ type: DELETE_RECIPE });
        } catch (error) {
            console.error(error);
        }
    }
}

//=================>>>>Post = Agregar<<<<=================//
export const postRecipe = (recipe) => {
    return async function(dispatch) {
        try {
            const res = await axios.post(`${URL}recipes`, recipe);
            return dispatch({ type: POST_RECIPE, payload: res.data });
        } catch(error) {
            console.error(error);
        }
    }
}

//=================>>>><<<<=================//
export const getAllRecipes = () => {
    return function (dispatch) {
        try {
            return fetch(`${URL}recipes`)
                .then( (res)    => res.json() )
                .then( (data)   => dispatch({ type: GET_ALL_RECIPES, payload: data }) )
                .catch( (error) => console.error(error) )
        } catch(error) {
                console.error(error);
        }
    }
}

//=================>>>><<<<=================//
export const getRecipeById = (id) => {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${URL}recipes/${id}`);
            return dispatch({ type: GET_RECIPE_BY_ID, payload: res.data });
        } catch(error) {
            console.error(error);
        }
    }
}

//=================>>>><<<<=================//
export const getDiets = () => {
    return async function(dispatch) {
        try {
            const res = await axios.get(`${URL}diets`);
            return dispatch({ type: GET_DIETS, payload: res.data });
        } catch(error) {
            console.error(error);
        }
    }
}

//=================>>>><<<<=================//
export const filterByDiets = (value) => {
    return async function(dispatch) {
        return dispatch({ type: FILTER_BY_DIEST, payload: value });
    }
}

//=================>>>><<<<=================//
export const orderRecipes = (value) => {
    return async function(dispatch) {
        return dispatch({ type: ORDER_RECIPES, payload: value });
    }
}   

//=================>>>><<<<=================//
export const searchByName = (value) => {
    return async function(dispatch) {
        try {
            const res = await axios.get(`${URL}recipes?name=${value}`);
            return dispatch({ type: SEARCH_BY_NAME, payload: res.data });
        } catch(error) {
            return dispatch({ type: SEARCH_BY_NAME, payload: [] });
        }
    }
}
