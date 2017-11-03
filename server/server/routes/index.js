import UserController from '../controller/user';
import RecipeController from '../controller/recipe';
import FavoriteController from '../controller/favorite';
import testMiddleware from '../middleware/token';
import Auth from '../middleware/auth';
import validate from '../middleware/validator';
// import recipeController from '../controllers/recipe';

export default (app) => {
  app.post('/api/users/signup', UserController.register);
  app.post('/api/users/signin', UserController.login);
  app.post('/api/recipes', testMiddleware, Auth, RecipeController.addRecipe);
  app.put('/api/recipes/:recipeId', validate.recipeId, testMiddleware, Auth, RecipeController.modifyRecipe);
  app.delete('/api/recipes/:recipeId', validate.recipeId, testMiddleware, Auth, RecipeController.removeRecipe);
  app.get('/api/recipes', testMiddleware, Auth, RecipeController.getAll);
  app.post('/api/recipes/:recipeId/reviews', validate.recipeId, testMiddleware, Auth, RecipeController.addReview);
  app.post('/api/:recipeId/favorites', FavoriteController.addFavorite);
};
