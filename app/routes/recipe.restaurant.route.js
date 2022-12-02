module.exports = function(app) {

    const recipeRestaurant = require('../controllers/recipe.restaurant.controller.js');

    // Create a new Ingredient
    app.post('/api/recipeRestaurant', recipeRestaurant.create);

    // Retrieve all Ingredient
    app.get('/api/recipeRestaurant', recipeRestaurant.findAll);

    // Retrieve a single Ingredient by Id
    app.get('/api/recipeRestaurant/:recipeRestaurantId', recipeRestaurant.findByPk);

    // Update a Ingredient with Id
    app.put('/api/recipeRestaurant/:recipeRestaurantId', recipeRestaurant.update);

    // Delete a Ingredient with Id
    app.delete('/api/recipeRestaurant/:recipeRestaurantId', recipeRestaurant.delete);

}