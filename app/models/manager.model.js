module.exports = (sequelize, DataTypes) => {
    const Manager = sequelize.define("manager", {
        name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    });

    return Manager;
};