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
            type: Sequelize.DATE,
            allowNull: false
        },
        hour: {
            type: Sequelize.HOUR,
            allowNull: false
        }
    });
    
    return Command;
};