require('dotenv').config();
const { API_KEY }= process.env;
const axios = require('axios');
const { Recipe, Diet } = require('./../db.js');

const URL = "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
//const URL = "https://api.spoonacular.com/recipes/complexSearch";

//=========>>>> toma datos obtenidos a través de una clave de API validada<<<<=========//
const getApiRecipes = async (amount = 100) => {
    const apiInfo = await validateApiKey(amount);
    const apiRecipes = await apiInfo.data.results.map( (el) => {
        return { 
            id:             el.id,
            name:           el.title, 
            summary:        el.summary.replace( /(<([^>]+)>)/ig, ''), 
            healthScore:    el.healthScore, 
            dishTypes:      el.dishTypes,
            steps:          el.analyzedInstructions[0]?.steps.map( (el) => el.step ),
            image:          el.image,
            diets:          el.diets.map( (el) => el )
        };
    });
    return apiRecipes;
}

//=======>>>>devuelve la respuesta exitosa si la claves de API es válida<<<<=======//



const validateApiKey = async (amountRecipes) => {
    let API_KEY = process.env.API_KEY;
    let amountKeys = 5;
    for(let i = 1; i <= amountKeys; i++) {
        try {
            let apiInfo = await axios.get(`${URL}?apiKey=${API_KEY}&addRecipeInformation=true&number=${amountRecipes}`);
            console.log('key actual', API_KEY);
            return apiInfo;
        } catch (error) {
            console.log(error, 'key vencida', API_KEY)
            API_KEY = process.env[`API_KEY${i}`];
        }
    }
}


//=================>>>>obtiene todas las recetas y dietas de BD<<<<=================//
const getBDRecipes = async () => {
    let newRecipe = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    return newRecipe.map( (el) => {
        return {
            ...el.dataValues,
            diets: el.diets?.map( (d) => d.name )
        }
    });
}

//=================>>>>combina las recetas obtenidas (de API y BD) en array<<<<=================//
const getAllRecipes = async () => {
    const apiInfo = await getApiRecipes();
    const dbInfo  = await getBDRecipes();
    return apiInfo.concat(dbInfo);
}

//=================>>>>obtiene todas las recetas (de API y BD) filtra las recetas por el ID<<<<=================//
const getRecipeById = async (id) => {
    let allInfo = await getAllRecipes();
    return await allInfo.filter( (el) => el.id == id );
}

//=================>>>>elimina una receta de la BD utilizando su ID<<<<=================//
const deleteRecipe = async (id) => {
   let res = await Recipe.destroy({
       where: {
           id
        }
    });
    return res;
}

//=================>>>>actualiza una receta en la BD<<<<=================//
const updateRecipe = async (recipe) => {
    let countUpdated = await Recipe.update(recipe, {
        where: {
            id: recipe.id
        }
    });

    let recipeUpdated = await Recipe.findOne({
        where: {
          id: recipe.id
        },
        include: Diet
    });

    let dietsDB = await Diet.findAll({
        where: { name: recipe.diets },
    });
    await recipeUpdated.diets.map((d) => recipeUpdated.removeDiets(d));
    await dietsDB.map( async (d) => await recipeUpdated.addDiets(d));
    await recipeUpdated.reload();

    return countUpdated;
}

//=====>>>>busca una receta existente en la BD por su nombre o crea una nueva receta<<<<=====//
const postRecipe = async ({name, summary, healthScore, dishTypes, steps, image, diets}) => {
    let [recipe, created] = await Recipe.findOrCreate({
        where: {
            name
        },
        defaults: {
            summary,
            healthScore,
            dishTypes,
            steps,
            image
        }
    });
    if(!created) { throw Error('La receta ya existe..'); };
   
    let dietsDB = await Diet.findAll({
        where: { name: diets },
    });

    recipe.addDiet(dietsDB);
    return recipe; 
}


//=======>>>>obtiene las dietas de los resultados de la API, las almacena en la BD<<<<=======//
const getDBDiets = async () => {
    const apiInfo = await validateApiKey(100);
    let apiDiets = apiInfo.data.results.map( (el) => el.diets );
    apiDiets = [...new Set(apiDiets.flat()), 'vegetarian'];

    for(let i = 0; i < apiDiets.length; i++) {
        await Diet.findOrCreate({ where: { name: apiDiets[i] } });
    }

    return await Diet.findAll();
}

module.exports = {
   getApiRecipes,
   getBDRecipes,
   getAllRecipes,
   getRecipeById,
   postRecipe,
   getDBDiets,
   deleteRecipe,
   updateRecipe
}