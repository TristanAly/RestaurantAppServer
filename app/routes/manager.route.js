module.exports = function(app) {
    const { authJwt } = require("../middleware")
    const manager = require('../controllers/manager.controller.js');


    // Create a new manager
    app.post('/api/managers', [authJwt.verifyToken, authJwt.isRestoOrDev],  manager.create);

    // Retrieve all manager
    app.get('/api/managers', manager.findAll);

    // Retrieve a single manager by Id
    app.get('/api/managers/:managerId', manager.findByPk);

    // Update a manager with Id
    app.put('/api/managers/:managerId', manager.update);

    // Delete a manager with Id
    app.delete('/api/managers/:managerId', manager.delete);

}