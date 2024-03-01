// Need to talk to our database for all CRUD operations
const RecipeModel = require('../models/recipe.js')

module.exports = {
    new: newRecipe,
    create: create,
    index: index,
    show: show
}

async function show(req, res) {
    try {
        const recipeFromTheDatabase = await RecipeModel.findById(req.params.id)
        // console.log(recipeFromTheDatabase)
        res.render('recipes/show', {
            recipe: recipeFromTheDatabase
            //Variable in show.ejs
            //Use in show.ejs
        });
    } catch (err) {
        console.log(err)
        res.send(err);
    }
}


async function create(req, res) {
    try {
        const createRecipeDoc = await RecipeModel.create(req.body)
        //wait to load before proceeding 
        res.redirect('/recipes/new')
    } catch (err) {
        console.log(err)
        res.redirect('/recipes/new')
    }
}

async function index(req, res) {

    // send a ejs page with all the recipes to the browser
    try {
        // model go to the database and get all the recipes
        const recipeDocumentsFromTheDB = await RecipeModel.find({})
        // send a ejs page with all the recipes to the browser
        // recipes/index is looking in the views folder for the ejs page
        res.render('recipes/index', { recipeDocs: recipeDocumentsFromTheDB })
        // recipeDocs is now a variables inside of views/recipe/index.ejs 
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

function newRecipe(req, res) {
    //res.render look at views for the ejs folder
    res.render('recipes/new')
}