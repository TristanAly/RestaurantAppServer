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

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//         dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//         }
//     }
// );

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

//Models/tables
db.manager = require('../models/manager.model.js')(sequelize, Sequelize);
db.recipe = require('../models/recipe.model.js')(sequelize, Sequelize);
db.ingredient = require('../models/ingredient.model.js')(sequelize, Sequelize)
db.ingredientRecipe = require('../models/ingredient.recipe.model.js')(sequelize, Sequelize)

db.users = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.message = require("../models/message.model")(sequelize, Sequelize);

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

db.users.hasMany(db.message, {as: "message"});
db.message.belongsTo(db.users,{
  foreignKey: "userId",
  as: "user"
})

// db.role.belongsToMany(db.users, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
// });

// db.users.belongsToMany(db.role, {
//     through: "user_roles",
//     foreignKey: "userId",
//     otherKey: "roleId"
// });

// db.users.hasMany(db.recipe, { as: "recipe"});
// db.recipe.belongsTo(db.users, { 
//   foreignKey: "recipeId",
//   as: "user"
// });
// db.users.hasMany(db.recipe, {as: "recipe"});
// db.manager.belongsTo(db.users,{
//     foreignKey: "userId",
//     as: "user"
// })

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

db.ROLES = ["user", "business", "dev"];

module.exports = db;