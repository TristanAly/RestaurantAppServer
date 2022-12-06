const db = require('../config/db.config.js');
// const env = require('../config/env.js');

const Favourite = db.favourite;

// Post a Ingredient
exports.create = (request, response) => { 
    // Save to MySQL database
    Favourite.create({  
        userId: request.body.userId,
        restaurantId: request.body.restaurantId
    }).then(Favourite => { 
    // Send created Favourite to client
    response.send(Favourite);
    });
};

// FETCH all Favourites
exports.findAll = (req, response) => {
    Favourite.findAll({
        include: ["restaurant", "user"]
    }).then(Favourite => {
        // Send all Favourites to Client
        response.send(Favourite);
    });
};

// Find a Favourite by Id
exports.findByPk = (request, response) => { 
    Favourite.findByPk(request.params.FavouriteId).then(Favourite => {
        response.send(Favourite);
    })
};

// Update a Favourite
exports.update = (request, response) => {
    const id = request.params.FavouriteId;
    Favourite.update( { 
        name: request.body.name
    }, 
    { where: {id: request.params.FavouriteId} }
    ).then(() => {
    response.status(200).send({ 
        message: 'updated successfully a Favourite with id = ' + id });
    });
};

// Delete a Favourite by Id
exports.delete = (request, response) => {
    const id = request.params.FavouriteId;
    Favourite.destroy({
        where: { id: id }
    }).then(() => {
        response.status(200).send({ 
        message: 'deleted successfully a Favourite with id = ' + id });
    });
}