'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _recipe = require('../model/recipe');

var _recipe2 = _interopRequireDefault(_recipe);

var _validator = require('../validator/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class recipe
 */
var Recipe = function () {
  function Recipe() {
    _classCallCheck(this, Recipe);
  }

  _createClass(Recipe, null, [{
    key: 'getRecipe',

    /**
     * @returns {Object} recipes
     * @param {*} req
     * @param {*} res
     */
    value: function getRecipe(req, res) {
      if (req.query.sort === 'upvotes') {
        if (req.query.order === 'desc') {
          _recipe2.default.sort(function (recipe1, recipe2) {
            return recipe1.upvotes > recipe2.upvotes;
          });
        } else {
          _recipe2.default.sort(function (recipe1, recipe2) {
            return recipe1.upvotes < recipe2.upvotes;
          });
        }
      }
      return res.status(200).json({
        recipes: _recipe2.default
      });
    }
    /**
     * @returns {Object} createRecipes
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'createRecipes',
    value: function createRecipes(req, res) {
      var validate = (0, _validator2.default)(req.body);
      var recipe = Object.assign({}, req.body, {
        upvotes: 0,
        downvotes: 0,
        favorited: 0,
        views: 0
      });
      if (validate.valid) {
        _recipe2.default.push(recipe);
        return res.status(201).json({
          feed: _recipe2.default[_recipe2.default.length - 1],
          message: 'success',
          error: false
        });
      }
      return res.status(400).send({ status: false, message: validate.message });

      // if (validate.valid) {
      //   recipes.push({
      //     id: recipes.length + 1,
      //     name: req.body.name,
      //     upvotes: 0,
      //     downvotes: 0,
      //     favorited: 0,
      //     views: 0,
      //     description: req.body.description,
      //     image: req.body.image,
      //     ingredients: req.body.ingredients,
      //     directions: req.body.directions,
      //   });
      // return res.status(200).json({
      //   feed: recipes[recipes.length - 1],
      //   message: 'success',
      //   error: false
      // });
    }
    /**
     * @returns {Object} updateRecipes
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'modifyRecipes',
    value: function modifyRecipes(req, res) {
      for (var i = 0; i < _recipe2.default.length; i += 1) {
        if (_recipe2.default[i].id === parseInt(req.params.recipeId, 10)) {
          _recipe2.default[i].name = req.body.name;
          _recipe2.default[i].description = req.body.description;
          _recipe2.default[i].image = req.body.image;
          _recipe2.default[i].ingredients = req.body.ingredients;
          _recipe2.default[i].directions = req.body.directions;
          return res.status(200).json({
            recipes: _recipe2.default[i],
            message: 'success',
            error: false
          });
        }
      }
      return res.status(404).json({
        message: 'recipe not found',
        error: true
      });
    }
    /**
     * @returns {object} removeRecipes
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'removeRecipes',
    value: function removeRecipes(req, res) {
      for (var i = 0; i < _recipe2.default.length; i += 1) {
        if (_recipe2.default[i].id === parseInt(req.params.recipeId, 10)) {
          _recipe2.default.splice(i, 1);
          return res.status(200).json({
            message: 'success',
            error: false
          });
        }
      }
      return res.status(404).json({
        message: 'recipe not found',
        error: true
      });
    }
    /**
     * @returns {obj} retrieveRecipes
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'retrieveRecipes',
    value: function retrieveRecipes(req, res) {
      for (var i = 0; i < _recipe2.default.length; i += 1) {
        if (_recipe2.default[i].id === parseInt(req.params.recipeId, 10)) {
          return res.status(200).json({
            recipes: _recipe2.default[i],
            message: 'success',
            error: false
          });
        }
      }
      return res.status(404).json({
        message: 'recipe not found',
        error: true
      });
    }
    /**
     * @returns {obj} addReview
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'addReview',
    value: function addReview(req, res) {
      for (var i = 0; i < _recipe2.default.length; i += 1) {
        if (_recipe2.default[i].id === parseInt(req.params.recipeId, 10)) {
          console.log(_recipe2.default);
          _recipe2.default[i].reviews.push(req.body.reviews);
          return res.status(200).json({
            recipes: _recipe2.default[i],
            message: 'success',
            error: false
          });
        }
      }
      return res.status(404).json({
        message: 'recipe not found',
        error: true
      });
    }
  }]);

  return Recipe;
}();

exports.default = Recipe;