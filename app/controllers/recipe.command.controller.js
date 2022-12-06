const db = require('../config/db.config.js');

const recipeCommand = db.recipeCommand;

// Post a recipeCommand
exports.create = (request, response) => { 
  // Save to MySQL database
  recipeCommand.create({
    commandId: request.body.commandId,
    recipeId: request.body.recipeId,
  }).then(recipeCommand => { 
  // Send created recipeCommand to client
  response.send(recipeCommand);
  });
};

// FETCH all IngredientRecipe
exports.findAll = (request, response) => {
  recipeCommand.findAll({
    include: ["recipe"]
  }).then(recipeCommand => {
    // Send all recipeCommand to Client
    response.send(recipeCommand);
  });
};

// Find a recipeCommand by Id
exports.findByPk = (request, response) => { 
      recipeCommand.findByPk(request.params.recipeCommandId, {
    include: ["recipe"]
  }).then(recipeCommand => {
    response.send(recipeCommand);
  })
};

// Update a recipeCommand
exports.update = (request, response) => {
  const id = request.params.recipeCommandId;
  recipeCommand.update( {
    commandId: request.body.commandId,
    recipeId: request.body.recipeId
  }, 
  { where: {id: request.params.recipeCommandId} }
  ).then(() => {
  response.status(200).send({ 
      message: 'updated successfully a user with id = ' + id });
  });
};

// Delete a recipeCommand by Id
exports.delete = (request, response) => {
  const id = request.params.recipeCommandId;
  recipeCommand.destroy({
    where: { id: id }
  }).then(() => {
    response.status(200).send({ 
      message: 'deleted successfully a user with id = ' + id });
  });
};