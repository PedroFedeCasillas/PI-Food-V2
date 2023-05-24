import { GET_ALL_RECIPES,
         GET_RECIPE_BY_ID,
         GET_DIETS,
         FILTER_BY_DIEST,
         ORDER_RECIPES, 
         SEARCH_BY_NAME, 
         POST_RECIPE,
         DELETE_RECIPE,
         CLEAN_RECIPE,
         UPDATE_RECIPE} from './../actions/index.js';

const initialState = {
    recipes: [],
    filterRecipes: [],
    allRecipes: [],
    diest: [],
    recipe: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_RECIPE:
            return {
                ...state
            }
        case DELETE_RECIPE:
            return {
                ...state
            }
        case POST_RECIPE: 
            return {
                ...state
            }
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: JSON.parse(JSON.stringify(action.payload)),
                filterRecipes: JSON.parse(JSON.stringify(action.payload))
            }
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipe: { ...action.payload[0] }
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case FILTER_BY_DIEST:
            const allRecipes = state.filterRecipes;
            const dietsFilter = (action.payload === 'all') 
                                  ? state.allRecipes 
                                  : allRecipes.filter( (el) => el.diets.includes(action.payload) );
            return {
                ...state,
                recipes: [...dietsFilter]
            }
        case ORDER_RECIPES:
            switch(action.payload) {
                case 'asc':
                    state.recipes.sort( (a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()) );
                break;
                case 'des':
                    state.recipes.sort( (a,b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()) );
                break;
                case 'ascScore':
                    state.recipes.sort( (a,b) => b.healthScore - a.healthScore );
                break;
                case 'desScore':
                    state.recipes.sort( (a,b) => a.healthScore - b.healthScore );
                break;
                default:
                    return;
            }
            return {
                ...state,
                recipes: [...state.recipes]
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                recipes: action.payload  
            }
        case CLEAN_RECIPE:
            return {
                ...state,
                recipes: [...state.allRecipes]
            }
        default:
            return ({ ...state });
    }
}

export default rootReducer;