import UserController from '../controller/user';
import RecipeController from '../controller/recipe';
import testMiddleware from '../middleware/token';
import secondMidd from '../middleware/ensureUser';
import validate from '../middleware/validator';
// import recipeController from '../controllers/recipe';

export default (app) => {
  //= ==================================================
  app.post('/api/users/signup', UserController.register);
  app.post('/api/users/signin', UserController.login);
  app.post('/api/recipes', testMiddleware, secondMidd, RecipeController.addRecipe);
  app.put('/api/recipes/:recipeId', validate.recipeId, testMiddleware, secondMidd, RecipeController.modifyRecipe);
  app.delete('/api/recipes/:recipeId', validate.recipeId, testMiddleware, secondMidd, RecipeController.removeRecipe);
  app.get('/api/recipes', testMiddleware, secondMidd, RecipeController.getAll);
  app.post('/api/recipes/:recipeId/reviews', validate.recipeId, testMiddleware, secondMidd, RecipeController.addReview);
};
