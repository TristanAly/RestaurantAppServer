module.exports = function(app) {

    const restaurant = require('../controllers/restaurant.controller.js');

    // Create a new Recipe
    app.post('/api/restaurant', restaurant.create);

    // Retrieve all Recipe
    app.get('/api/restaurant', restaurant.findAll);

    // Retrieve a single Recipe by Id
    app.get('/api/restaurants/:restaurantId', restaurant.findByPk);

    // Update a Recipe with Id
    app.put('/api/restaurants/:restaurantId', restaurant.update);;

}