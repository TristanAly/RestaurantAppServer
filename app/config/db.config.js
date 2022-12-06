const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    endpoint: process.env.API_URL,
    masterKey: process.env.API_KEY,
    port: process.env.PORT
};

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.USERNAME, 
    process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres'
    }
);

sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.manager = require("../models/manager.model")(sequelize, Sequelize);

db.restaurant= require("../models/restaurant.model")(sequelize, Sequelize);
db.recipe = require("../models/recipe.model")(sequelize, Sequelize);
db.recipeIngredient = require("../models/ingredient.recipe.model")(sequelize, Sequelize);
db.ingredients = require("../models/ingredient.model")(sequelize, Sequelize);
db.recipeCommand = require("../models/recipe.command.model")(sequelize, Sequelize);
db.command = require("../models/command.model")(sequelize, Sequelize);
db.ingredientCommand = require("../models/ingredient.command.model")(sequelize, Sequelize);
db.favourite = require("../models/favourite.model")(sequelize, Sequelize);

db.role.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.users.hasMany(db.manager, {as: "manager"});
db.manager.belongsTo(db.users,{
    foreignKey: "userId",
    as: "user"
})

// Manager - Restaurant
db.manager.hasMany(db.restaurant, { as: "restaurant"});
db.restaurant.belongsTo(db.manager, { 
  foreignKey: "managerId",
  as: "manager"
});

// Restaurant - Recipe
db.restaurant.hasMany(db.recipe, { as: "recipe"});
db.recipe.belongsTo(db.restaurant, { 
  foreignKey: "restaurantId",
  as: "restaurant"
});
// Recipe - Ingredient 
db.ingredients.belongsToMany(db.recipe, {
    through: "ingredient_recipe",
    foreignKey: "ingredientId",
    otherKey: "recipeId"
  });
  
  db.recipe.belongsToMany(db.ingredients, {
    through: "ingredient_recipe",
    foreignKey: "recipeId",
    otherKey: "ingredientId"
  });
  
  db.ingredients.hasMany(db.recipeIngredient)
  db.recipeIngredient.belongsTo(db.ingredients)
  
  db.recipe.hasMany(db.recipeIngredient)
  db.recipeIngredient.belongsTo(db.recipe)

// Command / Restaurant 
db.users.belongsToMany(db.restaurant, {
    through: "command",
    foreignKey: "userId",
    otherKey: "restaurantId"
});

db.restaurant.belongsToMany(db.users, {
    through: "command",
    foreignKey: "restaurantId",
    otherKey: "userId"
});

db.users.hasMany(db.command)
db.command.belongsTo(db.users)

db.restaurant.hasMany(db.command)
db.command.belongsTo(db.restaurant)

// Recipe - Command
// creer un tableau de recipe
// db.command.hasMany(db.recipe, { as: "recipe"});
// db.recipe.belongsTo(db.command, { 
//   foreignKey: "commandId",
//   as: "recipe"
// });
db.command.belongsToMany(db.recipe, {
    through: "recipe_command",
    foreignKey: "commandId",
    otherKey: "recipeId"
  });
  
  db.recipe.belongsToMany(db.command, {
    through: "recipe_command",
    foreignKey: "recipeId",
    otherKey: "commandId"
  });
  
  db.command.hasMany(db.recipeCommand)
  db.recipeCommand.belongsTo(db.command)
  
  db.recipe.hasMany(db.recipeCommand)
  db.recipeCommand.belongsTo(db.recipe)


  // ingredient - Command
  db.ingredients.belongsToMany(db.command, {
    through: "ingredient_command",
    foreignKey: "ingredientId",
    otherKey: "commandId"
});

db.command.belongsToMany( db.ingredients, {
    through: "ingredient_command",
    foreignKey: "commandId",
    otherKey: "ingredientId"
});
db.ingredients.hasMany(db.ingredientCommand)
db.ingredientCommand.belongsTo(db.ingredients)

db.command.hasMany(db.ingredientCommand)
db.ingredientCommand.belongsTo(db.command)


  // Restaurant - Users
  db.users.belongsToMany(db.restaurant, {
    through: "favourite",
    foreignKey: "userId",
    otherKey: "restaurantId"
  });
  
  db.restaurant.belongsToMany(db.users, {
    through: "favourite",
    foreignKey: "restaurantId",
    otherKey: "userId"
  });
  
  db.users.hasMany(db.favourite)
  db.favourite.belongsTo(db.users)
  
  db.restaurant.hasMany(db.favourite)
  db.favourite.belongsTo(db.restaurant)


// Roles
db.ROLES = ["user", "resto", "dev"];

module.exports = db;