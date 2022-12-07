const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
// const { message } = require("../models");
const db = require("../config/db.config");
const User = db.users;
const manager = db.manager;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
        message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
        }
        req.userId = decoded.id;
        next();
    });
};


isDev = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "dev") {
                req.role = "dev"
            next();
            return;
            }
        }

        res.status(403).send({
            message: "Require Developper Role!"
        });
        return;
        });
    });
};

isResto = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "resto") {
                req.role = "resto"
            next();
            return;
            }
        }

        res.status(403).send({
            message: "Require Business Role!"
        });
        });
    });
};

isRestoOrDev = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "resto") {
                    req.role = "resto"
                next();
                return;
                }

                if (roles[i].name === "dev") {
                    req.role = "dev"
                next();
                return;
                }
            }

        // if (roles) {
        //     next();
        //     return;
        // } else {
        //     res.status(403).send({
        //         message: "Require Role!"
        //     });
        // }
        // });
        // next();
        res.status(403).send({
            message: "Require Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isResto: isResto,
    isDev: isDev,
    isRestoOrDev: isRestoOrDev
};
module.exports = authJwt;