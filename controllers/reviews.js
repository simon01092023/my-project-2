const RecipeModel = require('../models/recipe');

module.exports = {
    create: create,
    delete: deleteOne,
    edit: edit

}
// async function update(req, res) {
//     // Note the cool "dot" syntax to query on the property of a subdoc
//     const book = await Book.findOne({'comments._id': req.params.id});
//     // Find the comment subdoc using the id method on Mongoose arrays
//     // https://mongoosejs.com/docs/subdocs.html
//     const commentSubdoc = book.comments.id(req.params.id);
//     // Ensure that the comment was created by the logged in user
//     if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
//     // Update the text of the comment
//     commentSubdoc.text = req.body.text;
//     try {
//       await book.save();
//     } catch (e) {
//       console.log(e.message);
//     }
//     // Redirect back to the book's show view
//     res.redirect(`/books/${book._id}`);
//   }
  

async function edit(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    const recipeDoc = await RecipeModel.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const review = recipeDoc.reviews.id(req.params.id);
    // Render the comments/edit.ejs template, passing to it the comment
    res.render('reviews/edit', { review });
  }

async function deleteOne(req, res) {
    try {
        const recipeDoc = await RecipeModel.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
        //find recipe with the review
        if (!recipeDoc) return res.redirect('/recipes')
        recipeDoc.reviews.remove(req.params.id)
        //removes the review from the array by id
        recipeDoc.save()
        res.redirect(`/recipes/${recipeDoc._id}`)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
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
        res.redirect(`/recipes/${req.params.id}`)
        //tells client to GET request to /recipes/(some ID)
    } catch (err) {
        console.log(err)
        res.send(err)
    }

}