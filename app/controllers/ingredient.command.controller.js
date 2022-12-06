const { recipe: ingredient } = require('../config/db.config.js');
const db = require('../config/db.config.js');
// const env = require('../config/env.js');

const IngredientCommand = db.ingredientCommand ;

// Post a Ingredient
exports.create = (request, response) => { 
    // Save to MySQL database
    IngredientCommand.create({  
        ingredientId: request.body.ingredientId,
        commandId: request.body.commandId
    }).then(IngredientCommand => { 
    // Send created IngredientCommand to client
    response.send(IngredientCommand);
    });
};

// FETCH all IngredientCommands
exports.findAll = (req, response) => {
    IngredientCommand.findAll({
        // include: ["IngredientCommand_recipe"]
    }).then(IngredientCommand => {
        // Send all IngredientCommands to Client
        response.send(IngredientCommand);
    });
};

// Find a IngredientCommand by Id
exports.findByPk = (request, response) => { 
    IngredientCommand.findByPk(request.params.IngredientCommandId).then(IngredientCommand => {
        response.send(IngredientCommand);
    })
};

// Update a IngredientCommand
exports.update = (request, response) => {
    const id = request.params.IngredientCommandId;
    IngredientCommand.update( { 
        name: request.body.name
    }, 
    { where: {id: request.params.IngredientCommandId} }
    ).then(() => {
    response.status(200).send({ 
        message: 'updated successfully a IngredientCommand with id = ' + id });
    });
};

// Delete a IngredientCommand by Id
exports.delete = (request, response) => {
    const id = request.params.IngredientCommandId;
    IngredientCommand.destroy({
        where: { id: id }
    }).then(() => {
        response.status(200).send({ 
        message: 'deleted successfully a IngredientCommand with id = ' + id });
    });
}