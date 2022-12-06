module.exports = function(app) {

    const favourite = require('../controllers/favourite.controller.js');

    // Create a new favourite
    app.post('/api/favourite', favourite.create);

    // Retrieve all favourite
    app.get('/api/favourite', favourite.findAll);

    // Retrieve a single favourite by Id
    app.get('/api/favourite/:favouriteId', favourite.findByPk);

    // Update a favourite with Id
    app.put('/api/favourite/:favouriteId', favourite.update);

    // Delete a favourite with Id
    app.delete('/api/favourite/:favouriteId', favourite.delete);

}