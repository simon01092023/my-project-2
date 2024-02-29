
// Create and export our object Model that controllers will use. 
// The model performs cruds operations on the recipe collection in our recipes database!
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// One Recipe has many reviews
// A Review belongs to a Recipe (Using mongoose embedding to implement the relationship)

// when we use embedding we define the schemas of the relationship in the same file
// Referencing (each data entity) gets its own model file
const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    // One to many relationship on the belongs to side
    user: {
        type: Schema.Types.ObjectId, // this is from mongoose
        ref: 'User' // this references this line mongoose.model('User', userSchema);
    },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
})

// shapes 
const recipeSchema = new Schema({
    recipelD: Number,
    recipeName: String,
    prepTime: Number,
    cookTime: Number,
    ingredients: String,
    reviews: [reviewSchema]
}, {
    timestamps: true
});

// Compile the schema into a model and export it
// Recipe creates a recipe collection in our recipes database
module.exports = mongoose.model('Recipe', recipeSchema);

