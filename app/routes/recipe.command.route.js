module.exports = function(app) {

    const recipeCommand = require('../controllers/recipe.command.controller.js');

    // Create a new Ingredient
    app.post('/api/recipeCommand', recipeCommand.create);

    // Retrieve all Ingredient
    app.get('/api/recipeCommand', recipeCommand.findAll);

    // Retrieve a single Ingredient by Id
    app.get('/api/recipeCommand/:recipeCommandId', recipeCommand.findByPk);

    // Update a Ingredient with Id
    app.put('/api/recipeCommand/:recipeCommandId', recipeCommand.update);

    // Delete a Ingredient with Id
    app.delete('/api/recipeCommand/:recipeCommandId', recipeCommand.delete);

}