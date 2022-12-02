module.exports = (sequelize, Sequelize) => {
    const Command = sequelize.define("command", {
        table: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        nomberpersonne: {
            type: Sequelize.INT,
            allowNull: false,
            unique: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            unique: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    
    return Command;
};