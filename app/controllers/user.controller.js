// const { manager } = require("../config/db.config");
const db = require("../config/db.config");
const User = db.users;
const Restaurant = db.restaurant;
const command = db.command;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    User.findAll().then(users => {
        res.send(users);
    });
};
exports.findByPk = (request, response) => { 
    User.findOne({
        where: { id: request.userId }
    }).then(user => {
        response.send(user);
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
    command.findAll().then(bons => {
        res.send(bons);
    });
};