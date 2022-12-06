module.exports = function(app) {

    const ingredientCommand = require('../controllers/ingredient.command.controller.js');

    // Create a new Ingredient
    app.post('/api/ingredientCommands', ingredientCommand.create);

    // Retrieve all Ingredient
    app.get('/api/ingredientCommands', ingredientCommand.findAll);

    // Retrieve a single Ingredient by Id
    app.get('/api/ingredientCommands/:ingredientCommandsId', ingredientCommand.findByPk);

    // Update a Ingredient with Id
    app.put('/api/ingredientCommands/:ingredientCommandsId', ingredientCommand.update);

    // Delete a Ingredient with Id
    app.delete('/api/ingredientCommands/:ingredientCommandsId', ingredientCommand.delete);

}