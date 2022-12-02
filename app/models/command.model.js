module.exports = (sequelize, Sequelize) => {
    const Command = sequelize.define("command", {
        table: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        nbperson: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            unique: false
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hour: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return Command;
};