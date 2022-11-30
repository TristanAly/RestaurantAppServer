const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  env.database, 
  env.username, 
  env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.min,
    acquire: env.acquire,
    idle: env.idle
  }
});

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     }
//   }
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.manager = require('../models/manager.model.js')(sequelize, Sequelize);
db.recipe = require('../models/recipe.model.js')(sequelize, Sequelize);
db.ingredient = require('../models/ingredient.model.js')(sequelize, Sequelize)
db.ingredientRecipe = require('../models/ingredient.recipe.model.js')(sequelize, Sequelize)

db.manager.hasMany(db.recipe, { as: "recipe"});
db.recipe.belongsTo(db.manager, { 
  foreignKey: "managerId",
  as: "manager"
});

// db.ingredient.hasMany(db.recipe, { as: "recipe"});
// db.recipe.belongsTo(db.manager, { 
//   foreignKey: "ingredientId",
//   as: "ingredient"
// });
db.ingredient.belongsToMany(db.recipe, {
    through: "ingredient_recipe",
    foreignKey: "ingredientId",
    otherKey: "recipeId"
  });
  
  db.recipe.belongsToMany(db.ingredient, {
    through: "ingredient_recipe",
    foreignKey: "recipeId",
    otherKey: "ingredientId"
  });
db.ingredient.hasMany(db.ingredientRecipe)
db.ingredientRecipe.belongsTo(db.ingredient)

db.recipe.hasMany(db.ingredientRecipe)
db.ingredientRecipe.belongsTo(db.recipe)

module.exports = db;