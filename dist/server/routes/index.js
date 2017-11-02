'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _recipe = require('../controller/recipe');

var _recipe2 = _interopRequireDefault(_recipe);

var _token = require('../middleware/token');

var _token2 = _interopRequireDefault(_token);

var _ensureUser = require('../middleware/ensureUser');

var _ensureUser2 = _interopRequireDefault(_ensureUser);

var _validator = require('../middleware/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import recipeController from '../controllers/recipe';

exports.default = function (app) {
  app.post('/api/users/signup', _user2.default.register);
  app.post('/api/users/signin', _user2.default.login);
  app.post('/api/recipes', _token2.default, _ensureUser2.default, _recipe2.default.addRecipe);
  app.put('/api/recipes/:recipeId', _validator2.default.recipeId, _token2.default, _ensureUser2.default, _recipe2.default.modifyRecipe);
  app.delete('/api/recipes/:recipeId', _validator2.default.recipeId, _token2.default, _ensureUser2.default, _recipe2.default.removeRecipe);
  app.get('/api/recipes', _token2.default, _ensureUser2.default, _recipe2.default.getAll);
  app.post('/api/recipes/:recipeId/reviews', _validator2.default.recipeId, _token2.default, _ensureUser2.default, _recipe2.default.addReview);
};