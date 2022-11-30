module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("ingredient", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      }
    });
    
    return Ingredient;
  };