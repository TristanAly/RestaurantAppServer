module.exports = (sequelize, DataTypes) => {
    const Manager = sequelize.define("manager", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      restaurant: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      }
    });
  
    return Manager;
};