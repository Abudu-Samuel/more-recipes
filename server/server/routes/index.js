// import Recipes from '../controller/recipe';
// import recipes from '../model/recipe';
import UserController from '../controller/user';
import RecipeController from '../controller/recipe';
// import recipeController from '../controllers/recipe';

export default (app) => {
  // app.get('/api/recipes', Recipes.getRecipe);
  // app.post('/api/recipes', Recipes.createRecipes);
  // app.put('/api/recipes/:recipeId', Recipes.modifyRecipes);
  // app.delete('/api/recipes/:recipeId', Recipes.removeRecipes);
  // app.get('/api/recipes/:recipeId', Recipes.retrieveRecipes);
  // app.post('/api/recipes/:recipeId/reviews', Recipes.addReview);

  //= ==================================================
  app.post('/api/users/signup', UserController.register);
  app.post('/api/users/signin', UserController.login);
  app.post('/api/recipes', RecipeController.addRecipe);
};
