const RecipeModel = require('../models/recipe.js')

module.exports = {
    new: newRecipe,
    index

}

async function index(req, res) {

    // then we want to send a ejs page with all the recipes to the browser
    try {
        // We want our model to go to the database and get all the recipes
        const recipeDocumentsFromTheDB = await RecipeModel.find({})
        console.log(recipeDocumentsFromTheDB)
        // then we want to send a ejs page with all the recipes to the browser
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