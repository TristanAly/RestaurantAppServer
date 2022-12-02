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

db.restaurant.belongsToMany(db.manager, {
    through: "manager_restaurants",
    foreignKey: "restaurantId",
    otherKey: "managerId"
});

db.manager.belongsToMany(db.restaurant, {
    through: "manager_restaurants",
    foreignKey: "managerId",
    otherKey: "restaurantId"
});

db.manager.hasMany(db.recipe, {as: "recipe"});
db.recipe.belongsTo(db.recipe,{
    foreignKey: "managerId",
    as: "manager"
})
db.ingredients.belongsToMany(db.recipe, {
    through: "recipeIngredients"
});

db.recipe.belongsToMany(db.ingredients, {
    through: "recipeIngredients"
});

db.ingredients.hasMany(db.recipeIngredient)
db.recipeIngredient.belongsTo(db.ingredients)

db.recipe.hasMany(db.recipeIngredient)
db.recipeIngredient.belongsTo(db.recipe)

db.ROLES = ["user", "business", "dev"];

module.exports = db;