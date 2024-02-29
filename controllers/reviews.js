const RecipeModel = require('../models/recipe');

module.exports = {
    create
}

async function create(req, res) {

    try {
        const recipeDoc = await RecipeModel.findById(req.params.id)
        //get recipe by ID 

        req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.userAvatar = req.user.avatar
        // Add the users information the review
        recipeDoc.reviews.push(req.body);
        //Add new review into the review array 
        await recipeDoc.save()
        //wait to tell database you have added review to recipe
        //then respond to client 
        res.redirect('/recipes/${req.params.id}')
        //tells client to GET request to /recipes/(some ID)
    } catch (err) {
        console.log(err)
        res.send(err)
    }

}