const db = require('../config/db.config.js');

const Recipe = db.recipe;

// Post a Recipe
exports.create = (request, response) => { 
 // Save to MySQL database
Recipe.create({  
      name: request.body.name,
      image: request.body.image,
      category: request.body.category,
      price_range: request.body.price_range,
      description: request.body.description,
      restaurantId: request.body.restaurantId
    //  ingredientId: request.body.ingredientId 
   }).then(recipe => { 
      response.send(recipe);
   });
};

// FETCH all Recipes
exports.findAll = (request, response) => {
   Recipe.findAll({
      include: ["restaurant", "ingredients"]
   }).then(recipe => {
      response.send(recipe);
   })
}

// Find a Recipe by Id
exports.findByPk = (request, response) => { 
   Recipe.findByPk(request.params.recipeId, {
      include: ["manager", "ingredients"] //deleted USER? added "manager", "ingredients"
   }).then(recipe => {
      console.log("Creted")
      response.send(recipe);
   })
};

// Update a Recipe
exports.update = (request, response) => {
const id = request.params.recipeId;
      Recipe.update( {
         name: request.body.name,
         image: request.body.image,
         category: request.body.category,
         price_range: request.body.price_range,
         desciption: request.body.desciption,
         userId: request.body.userId,
         ingredientId: request.body.ingredientId 
      }, 
      { where: {id: request.params.recipeId} }
      ).then(() => {
      response.status(200).send({ 
         message: 'updated successfully a recipe with id = ' + id });
      });
};

// Delete a Recipe by Id
exports.delete = (request, response) => {
   const id = request.params.recipeId;
      Recipe.destroy({
         where: { id: id }
      }).then(() => {
      response.status(200).send({ 
         message: 'deleted successfully a recipe with id = ' + id });
      });
};