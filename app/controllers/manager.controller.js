const db = require('../config/db.config.js');
// const env = require('../config/env.js');

const Manager = db.manager;

// Post a Manager
exports.create = (request, response) => { 
 // Save to MySQL database
    Manager.create({  
        name: request.body.name,
        image: request.body.image,
        userId: request.userId
    }).then(manager => { 
    // Send created manager to client
    response.send(manager);
    });
};

// FETCH all Managers
exports.findAll = (request, response) => {
        Manager.findAll({
    include: ["user", "restaurant"]
    }).then(managers => {
    // Send all managers to Client
    response.send(managers);
    });
};

// Find a Manager by Id
exports.findByPk = (request, response) => { 
        Manager.findByPk(request.params.managerId, {
    include: ["restaurant"]
    }).then(manager => {
    response.send(manager);
    })
};

// Update a Manager
exports.update = (request, response) => {
    const id = request.params.managerId;
    Manager.update( { 
        name: request.body.name,
        image: request.body.image,
        restaurant: request.body.restaurantId
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