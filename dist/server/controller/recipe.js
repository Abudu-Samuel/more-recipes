'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var recipes = _models2.default.recipe;
var reviews = _models2.default.review;
/**
 *@class RecipeController
 */

var RecipeController = function () {
  function RecipeController() {
    _classCallCheck(this, RecipeController);
  }

  _createClass(RecipeController, null, [{
    key: 'addRecipe',

    /**
     * @returns {Object} addRecipe
     * @param {Object} req
     * @param {Object} res
     */
    value: function addRecipe(req, res) {
      var errors = [];
      var _req$body = req.body,
          name = _req$body.name,
          ingredients = _req$body.ingredients,
          description = _req$body.description,
          category = _req$body.category,
          directions = _req$body.directions,
          imageurl = _req$body.imageurl;

      if (!name || typeof name !== 'string') {
        errors.push('Name of recipe is required');
      }
      if (!ingredients || typeof ingredients !== 'string') {
        errors.push('Ingredient(s) required');
      }
      if (!description || typeof description !== 'string') {
        errors.push('Description(s) required');
      }
      if (!category || typeof category !== 'string') {
        errors.push('Category(s) required');
      }
      if (!directions || typeof directions !== 'string') {
        errors.push('Direction(s) required');
      }
      if (!imageurl) {
        errors.push('Image required');
      }
      if (errors.length > 0) {
        return res.status(400).send({
          message: errors
        });
      }
      console.log(req.userId);
      return recipes.create({
        name: name,
        ingredients: ingredients,
        description: description,
        category: category,
        directions: directions,
        imageurl: imageurl,
        userId: req.userId
      }).then(function (addRecipe) {
        return res.status(201).send(addRecipe);
      }).catch(function (error) {
        console.log(error);
        return res.status(500).send({
          message: 'Some error occured'
        });
      });
    }
    /**
     * @static
     * @param {any} req
     * @param {any} res
     * @returns {json} modifies the recipe
     * @memberof RecipeController
     */

  }, {
    key: 'modifyRecipe',
    value: function modifyRecipe(req, res) {
      var _req$body2 = req.body,
          name = _req$body2.name,
          ingredients = _req$body2.ingredients,
          description = _req$body2.description,
          category = _req$body2.category,
          directions = _req$body2.directions,
          imageurl = _req$body2.imageurl;

      console.log(parseInt(req.params.recipeId, 10), '*********************************');
      return recipes.findById(parseInt(req.params.recipeId, 10)).then(function (recipeFound) {
        console.log(recipeFound);
        if (!recipeFound) {
          return res.status(404).send({
            message: 'Recipe not Found'
          });
        }
        return recipeFound.update({
          name: name,
          ingredients: ingredients,
          description: description,
          category: category,
          directions: directions,
          imageurl: imageurl
        }).then(function (updatedRecipe) {
          return res.status(200).send({
            message: 'Recipe updated!!',
            updatedRecipe: updatedRecipe
          });
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return console.log(error);
      });
    }
    /**
       * @returns {Object} removeRecipe
       * @param {Object} req
       * @param {Object} res
       */

  }, {
    key: 'removeRecipe',
    value: function removeRecipe(req, res) {
      return recipes.findById(parseInt(req.params.recipeId, 10)).then(function (recipeFound) {
        if (!recipeFound) {
          return res.status(404).send({
            message: 'Recipe not Found'
          });
        }
        if (req.userId !== recipeFound.userId) {
          return res.status(401).send({
            message: 'You do not have the permission to do that!'
          });
        }
        return recipeFound.destroy().then(function () {
          return res.status(200).send({
            message: 'Recipe deleted'
          });
        }).catch(function (err) {
          return res.status(400).send(err);
        });
      }).catch(function (err) {
        return res.status(500).send(err);
      });
    }
    /**
     * @static
     * @param {any} req
     * @param {any} res
     * @returns {json} get al recipes
     * @memberof RecipeController
     */

  }, {
    key: 'getAll',
    value: function getAll(req, res) {
      if (req.query.order || req.query.sort) {
        return recipes.findAll({
          order: [['upVotes', 'DESC']]
        }).then(function (sortedRecipes) {
          return res.status(200).send(sortedRecipes);
        }).catch(function () {
          return res.status(400).send({
            message: 'Error Occured'
          });
        });
      }
      return recipes.all().then(function (allrecipes) {
        return res.status(200).send(allrecipes);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
    /**
     * @static
     * @param {any} req
     * @param {any} res
     * @returns {Object} add reviews
     * @memberof RecipeController
     */

  }, {
    key: 'addReview',
    value: function addReview(req, res) {
      return recipes.findById(parseInt(req.params.recipeId, 10)).then(function (recipeFound) {
        if (!recipeFound) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return reviews.create({
          content: req.body.content,
          recipeId: req.params.recipeId,
          userId: req.userId
        }).then(function (createdReview) {
          return res.status(201).send({
            message: 'Review Added successfully',
            data: createdReview
          });
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
    /**
     * @static
     * @param {Object} req
     * @param {anObjecty} res
     * @returns {Object} getHighVote
     * @memberof RecipeController
     */

  }]);

  return RecipeController;
}();

exports.default = RecipeController;