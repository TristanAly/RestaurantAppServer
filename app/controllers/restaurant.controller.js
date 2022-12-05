const { manager } = require('../config/db.config.js');
const db = require('../config/db.config.js');
// const env = require('../config/env.js');

const Restaurant = db.restaurant;

exports.create = (request, response) => { 
    Restaurant.create({  
        name: request.body.name,
        image: request.body.image,
        address: request.body.address,
        description: request.body.description,
        managerId: request.body.managerId
    }).then(restaurant => { 
    response.send(restaurant);
    });
};

// FETCH all Restaurants
exports.findAll = (req, response) => {
    Restaurant.findAll({
        include: ["manager","recipe"]
    }).then(restaurant => {
        response.send(restaurant);
    });
};

// Find a Restaurant by Id
exports.findByPk = (request, response) => { 
    Restaurant.findByPk(request.params.restaurantId, {
        include: ["manager","recipe"]
    }).then(restaurant => {
        response.send(restaurant);
    });
};

exports.update = (request, response) => {
    const id = request.params.RestaurantId;
    Restaurant.update( { 
        name: request.body.name
    }, 
    { where: {id: request.params.restaurantId} }
    ).then(() => {
    response.status(200).send({ 
        message: 'updated successfully a Restaurant with id = ' + id });
    });
};