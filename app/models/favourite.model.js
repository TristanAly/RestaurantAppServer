module.exports = (sequelize, DataTypes) => {
    const Favourite = sequelize.define("favourite", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Favourite;
};