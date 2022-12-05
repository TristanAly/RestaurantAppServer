module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("restaurant", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    });

    return Restaurant;
};