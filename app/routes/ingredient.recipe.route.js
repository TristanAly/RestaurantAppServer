module.exports = function(app) {

    const ingredientRecipe = require('../controllers/ingredient.recipe.controller.js');

    // Create a new Ingredient
    app.post('/api/ingredientRecipes', ingredientRecipe.create);

    // Retrieve all Ingredient
    app.get('/api/ingredientRecipes', ingredientRecipe.findAll);

    // Retrieve a single Ingredient by Id
    app.get('/api/ingredientRecipes/:ingredientRecipesId', ingredientRecipe.findByPk);

    // Update a Ingredient with Id
    app.put('/api/ingredientRecipes/:ingredientRecipesId', ingredientRecipe.update);

    // Delete a Ingredient with Id
    app.delete('/api/ingredientRecipes/:ingredientRecipesId', ingredientRecipe.delete);

}