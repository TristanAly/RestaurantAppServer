// const { manager } = require("../config/db.config");
const db = require("../config/db.config");
const User = db.users;
const Message = db.message;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    Message.findAll().then(users => {
        res.send(users);
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

exports.restoBoard = (req, res) => {
    User.findAll().then(users => {
        res.send(users);
    });
}; 