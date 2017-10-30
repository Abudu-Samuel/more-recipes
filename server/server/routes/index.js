import Recipes from '../controller/recipe';
// import recipes from '../model/recipe';
// import userController from '../controllers/user';
// import recipeController from '../controllers/recipe';

export default (app) => {
  app.get('/api/recipes', Recipes.getRecipe);
  app.post('/api/recipes', Recipes.createRecipes);
  app.put('/api/recipes/:recipeId', Recipes.modifyRecipes);
  app.delete('/api/recipes/:recipeId', Recipes.removeRecipes);
  app.get('/api/recipes/:recipeId', Recipes.retrieveRecipes);
  app.post('/api/recipes/:recipeId/reviews', Recipes.addReview);

  //= ==================================================
  // app.post('/api/users/signup', userController.register);
  // app.post('/api/users/signin', userController.login);
  // app.post('/api/recipes', recipeController.addRecipe);
};
