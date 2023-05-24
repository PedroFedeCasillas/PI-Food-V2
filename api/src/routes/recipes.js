const { Router } = require('express');
const { getAllRecipes,
        getRecipeById,
        postRecipe,
        deleteRecipe, 
        updateRecipe} = require('./../controllers/index.js');
const router = Router();

module.exports = router;

router.get('/', async (req, res) => {
    let { name } = req.query;
    try {
        let recipes = await getAllRecipes();
        if(!name) { return res.status(200).json(recipes); }

        const filteredRecipes = recipes.filter( (el) => el.name.toLowerCase().includes(name.toLowerCase()) );
        return (filteredRecipes.length) 
                ? res.status(200).json(filteredRecipes)
                : res.status(404).json('No se encontraron recetas.');
    } catch (error) {
        return res.status(404).json( { error: error.message } );
    }
});

router.get('/:idReceta', async (req, res) => {
    let { idReceta } = req.params;
    try {
        const recipe = await getRecipeById(idReceta);
        if(!recipe) { throw Error('No se encontró ninguna receta.'); }
        res.json(recipe);
    } catch(error) {
        res.status(404).json( { error: error.message } );
    }
});

router.post('/', async (req, res) => {
    let { name, summary, healthScore, dishTypes, steps, image, diets } = req.body;
    try {
        if(!name || !summary) { throw Error('No hay suficientes parámetros para realizar esta solicitud.'); };
        const recipe = await postRecipe({ name, summary, healthScore, dishTypes, image, steps, diets })
        
        res.status(201).json(recipe);
    } catch (error) {
        res.status(404).json( { error: error.message } );
    }
});

router.put('/', async (req, res) => {
    let { id, name, summary, healthScore, dishTypes, steps, image, diets } = req.body;
    try {
        if(!id || !name || !summary) {
            throw Error('No hay suficientes parámetros para realizar esta solicitud.');
        }
        let updated = await updateRecipe({
            id, name, summary, healthScore, dishTypes, steps, image, diets
        });
        res.json( (updated.length) ? `${updated[0]} las recetas fueron modificadas` : 'No se cambiaron las recetas' );
    } catch(error) {
        res.status(404).json( { error: error.message } );
    }
});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        res.json(await deleteRecipe(id));
    } catch(error) {
        res.status(404).json( { error: error.message } );
    }
});


/*
router.post('/', async (req, res) => {
    let { name, summary, healthScore, dishTypes, steps, image, diets } = req.body;
    try {
        if(!name || !summary) {
            throw Error('There are not enough parameters to make this request');
        };
        postRecipe({ name, summary, healthScore, dishTypes, steps, image, diets })
            .then( (recipe) => {
                res.status(201).json(recipe);
            })
    } catch (error) {
        res.status(404).json( { error: error.message } );
    }
}); 
*/