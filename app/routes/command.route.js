module.exports = function(app) {

    const { authJwt } = require("../middleware")
    const command = require('../controllers/command.controller.js');

    // Create a new Ingredient
    app.post('/api/commands',  [authJwt.verifyToken] ,command.create);

    // Retrieve all Ingredient
    app.get('/api/commands', command.findAll);

    // Retrieve a single Ingredient by Id
    app.get('/api/commands/:commandId', command.findByPk);

    // Update a Ingredient with Id
    app.put('/api/commands/:commandId', command.update);

    // Delete a Ingredient with Id
    app.delete('/api/commands/:commandId', command.delete);

}