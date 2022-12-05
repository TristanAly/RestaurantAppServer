module.exports = (sequelize, Sequelize) => {
    const Command = sequelize.define("command", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
            allowNull: true
        },
        hour: {
            type: Sequelize.STRING,
            allowNull: true
        }
        // userId: {
        //     type: Sequelize.INTEGER,
        //     Foreignkey: true
        // },
        // restaurantId: {
        //     type: Sequelize.INTEGER,
        //     Foreignkey: true
        // },
    });
    
    return Command;
};