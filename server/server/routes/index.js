import UserController from '../controller/user';
import RecipeController from '../controller/recipe';
import testMiddleware from '../middleware/token';
import secondMidd from '../middleware/ensureUser';
import Validate from '../middleware/validator';
// import recipeController from '../controllers/recipe';

export default (app) => {
  //= ==================================================
  app.post('/api/users/signup', UserController.register);
  app.post('/api/users/signin', UserController.login);
  app.post('/api/recipes', testMiddleware, secondMidd, RecipeController.addRecipe);
  app.put('/api/recipes/:recipeId', Validate.recipeId, testMiddleware, secondMidd, RecipeController.modifyRecipe);
  app.delete('/api/recipes/:recipeId', Validate.recipeId, testMiddleware, secondMidd, RecipeController.removeRecipe);
  app.get('/api/recipes', testMiddleware, secondMidd, RecipeController.getAll);
  app.post('/api/recipes/:recipeId/reviews', Validate.recipeId, testMiddleware, secondMidd, RecipeController.addReview);
};
