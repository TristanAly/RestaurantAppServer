const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // routes for public content
    app.get("/api/all", controller.allAccess);

    // routes for user content
    app.get(
        "/api/user/",
        [authJwt.verifyToken],
        controller.userBoard
    );

    // routes for moderator content
    app.get(
        "/api/business",
        [authJwt.verifyToken, authJwt.isRestoOrDev],
        controller.businessBoard
    );

    // routes for admin content (everything)
    app.get(
        "/api/developper",
        [authJwt.verifyToken, authJwt.isDev],
        controller.devBoard
    );
    app.delete(
        "/api/developper/:id",
        [authJwt.verifyToken, authJwt.isDev],
        controller.devBoardDelete
    );
};