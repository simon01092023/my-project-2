const router = require('express').Router();
const passport = require('passport');
const recipeCtrl = require('../controllers/recipes')

router.get('/', recipeCtrl.index)

router.get('/new', recipeCtrl.new)

module.exports = router;