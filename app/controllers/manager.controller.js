const db = require('../config/db.config.js');
const env = require('../config/env.js');
 
const Manager = db.manager;
 
// Post a Manager
exports.create = (request, response) => { 
 // Save to MySQL database
 Manager.create({  
      name: request.body.name,
      email: request.body.email,
      restaurant: request.body.restaurant,
      address: request.body.address
 }).then(manager => { 
 // Send created manager to client
 response.send(manager);
 });
};
 
// FETCH all Managers
exports.findAll = (request, response) => {
    Manager.findAll({
  include: ["recipe"]
 }).then(managers => {
   // Send all managers to Client
   response.send(managers);
 });
};
 
// Find a Manager by Id
exports.findByPk = (request, response) => { 
    Manager.findByPk(request.params.managerId, {
  include: ["recipe"]
 }).then(manager => {
  response.send(manager);
 })
};
 
// Update a Manager
exports.update = (request, response) => {
 const id = request.params.managerId;
 Manager.update( { 
      name: request.body.name,
      email: request.body.email,
      restaurant: request.body.restaurant,
      address: request.body.address
}, 
 { where: {id: request.params.managerId} }
 ).then(() => {
 response.status(200).send({ 
    message: 'updated successfully a manager with id = ' + id });
 });
};
 
// Delete a Manager by Id
exports.delete = (request, response) => {
 const id = request.params.managerId;
 Manager.destroy({
   where: { id: id }
 }).then(() => {
  response.status(200).send({ 
    message: 'deleted successfully a manager with id = ' + id });
 });
}