const { recipe } = require('../config/db.config.js');
const db = require('../config/db.config.js');

const Command = db.command;

// Post a Command
exports.create = (request, response) => { 
 // Save to MySQL database
Command.create({  
    table: request.body.table,
    nbperson: request.body.nbperson,
    price: request.body.price,
    date: request.body.date,
    hour: request.body.hour,
    userId: request.userId,
    restaurantId: request.body.restaurantId
   }).then(command => { 
      response.send(command);
   });
};

// FETCH all Commands
exports.findAll = (request, response) => {
    Command.findAll({
      include: ["restaurant", "user"]
   }).then(command => {
      response.send(command);
   })
}

// Find a Command by Id
exports.findByPk = (request, response) => { 
    Command.findByPk(request.params.commandId, {
      include: ["restaurant", "user"] 
   }).then(command => {
      console.log("Creted")
      response.send(command);
   })
};

// Update a Command
exports.update = (request, response) => {
const id = request.params.commandId;
      Command.update( {
        table: request.body.table,
        nbperson: request.body.nbperson,
        price: request.body.price,
        date: request.body.date,
        hour: request.body.hour
      }, 
      { where: {id: request.params.commandId} }
      ).then(() => {
      response.status(200).send({ 
         message: 'updated successfully a Command with id = ' + id });
      });
};

// Delete a Command by Id
exports.delete = (request, response) => {
   const id = request.params.commandId;
      Command.destroy({
         where: { id: id }
      }).then(() => {
      response.status(200).send({ 
         message: 'deleted successfully a command with id = ' + id });
      });
};