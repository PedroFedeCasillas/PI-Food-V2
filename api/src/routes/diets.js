const { Router } = require('express');
const { getDBDiets } = require('./../controllers/index.js');
const router = Router();

module.exports = router;

router.get('/', async (req, res) => {
    try {
        res.json( await getDBDiets() );
    } catch (error) {
        res.status(404).json( { error: error.message } );
    }
});
