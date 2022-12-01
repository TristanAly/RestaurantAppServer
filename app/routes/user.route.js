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

    app.get("/api/all", controller.allAccess);

    app.get(
        "/api/user/",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/restaurant",
        [authJwt.verifyToken, authJwt.isResto],
        controller.restoBoard
    );

    app.get(
        "/api/developper",
        [authJwt.verifyToken, authJwt.isRestoOrDev],
        controller.devBoard
    );
    app.delete(
        "/api/developper/:id",
        [authJwt.verifyToken, authJwt.isDev],
        controller.devBoardDelete
    );
};