// const { manager } = require("../config/db.config");
const db = require("../config/db.config");
const User = db.users;
const Restaurant = db.restaurant;
const bonDecommand = db.bonDecommands;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    Restaurant.findAll().then(restaurants => {
        res.send(restaurants);
    });
};

exports.devBoard = (req, res) => {
    User.findAll().then(users => {
        res.send(users);
    });
};

exports.devBoardDelete = (req, res) => {
    const id = req.params.id
    User.destroy({
        where: { id: id}
    }).then(() => {
        res.status(200).send({ message: 'Developper deleted successfully a user with id =' + id});
    });
};

exports.businessBoard = (req, res) => {
    bonDecommand.findAll().then(bons => {
        res.send(bons);
    });
};