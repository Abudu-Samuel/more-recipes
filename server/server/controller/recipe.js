import db from '../models/';

const recipes = db.recipe;
const reviews = db.review;
/**
 *@class RecipeController
 */
class RecipeController {
  /**
   * @returns {Object} addRecipe
   * @param {Object} req
   * @param {Object} res
   */
  static addRecipe(req, res) {
    const errors = [];
    const {
      name, ingredients, description, category, directions, imageurl,
    } = req.body;
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
    return recipes
      .create({
        name,
        ingredients,
        description,
        category,
        directions,
        imageurl,
        userId: req.userId
      })
      .then(addRecipe => res.status(201).send(addRecipe))
      .catch((error) => {
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
  static modifyRecipe(req, res) {
    const {
      name, ingredients, description, category, directions, imageurl
    } = req.body;
    console.log(parseInt(req.params.recipeId, 10), '*********************************');
    return recipes
      .findById(parseInt(req.params.recipeId, 10))
      .then((recipeFound) => {
        console.log(recipeFound);
        if (!recipeFound) {
          return res.status(404).send({
            message: 'Recipe not Found'
          });
        }
        return recipeFound
          .update({
            name,
            ingredients,
            description,
            category,
            directions,
            imageurl
          })
          .then(updatedRecipe => res.status(200).send({
            message: 'Recipe updated!!',
            updatedRecipe
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => console.log(error));
  }
  /**
     * @returns {Object} removeRecipe
     * @param {Object} req
     * @param {Object} res
     */
  static removeRecipe(req, res) {
    return recipes
      .findById(parseInt(req.params.recipeId, 10))
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404).send({
            message: 'Recipe not Found'
          });
        }
        return recipeFound
          .destroy()
          .then(() => res.status(200).send({
            message: 'Recipe deleted'
          }))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(500).send(err));
  }
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {json} get al recipes
   * @memberof RecipeController
   */
  static getAll(req, res) {
    return recipes
      .all()
      .then(allrecipes => res.status(200).send(allrecipes))
      .catch(error => res.status(400).send(error));
  }
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {Object} add reviews
   * @memberof RecipeController
   */
  static addReview(req, res) {
    return recipes
      .findById(parseInt(req.params.recipeId, 10))
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404).send({
            message: 'Recipe not found'
          });
        }
        return reviews
          .create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.userId,
          })
          .then(createdReview => res.status(201).send({
            message: 'Review Added successfully',
            data: createdReview
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(500).send(error));
  }
}

export default RecipeController;
