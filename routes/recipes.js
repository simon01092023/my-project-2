const router = require('express').Router();
const passport = require('passport');
const recipeCtrl = require('../controllers/recipes');
const isLoggedIn = require('../config/auth');


router.get('/', isLoggedIn, recipeCtrl.index)
router.get('/new', recipeCtrl.new)
router.get('/:id', recipeCtrl.show)
router.post('/', recipeCtrl.create)


module.exports = router;