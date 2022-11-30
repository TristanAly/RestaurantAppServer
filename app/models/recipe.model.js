module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("recipe", {
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      price_range: {
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
  
    return Recipe;
  };