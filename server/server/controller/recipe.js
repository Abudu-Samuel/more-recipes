import db from '../models/';

const recipes = db.recipe;
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
    const {
      name, ingredients, description, directions, imageurl,
    } = req.body;
    return recipes
      .create({
        name,
        ingredients,
        description,
        directions,
        imageurl,
        userId: req.userId
      })
      .then(addRecipe => res.status(201).send(addRecipe))
      .catch(error => res.status(400).send(error));
  }
  /**
     * @returns {Object} modifyRecipy
     * @param {Object} req
     * @param {Object} res
     */
  static modifyRecipe(req, res) {
    const {
      name, ingredients, description, directions, imageurl
    } = req.body;
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
            directions,
            imageurl
          })
          .then(updatedRecipe => res.status(200).send(updatedRecipe))
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
      .catch(err => res.status(400).send(err));
  }
  /**
     * @returns {Object} getAll
     * @param {*} req
     * @param {*} res
     */
  static getAll(req, res) {
    return recipes
      .all()
      .then(allrecipes => res.status(200).send(allrecipes))
      .catch(error => res.status(400).send(error));
  }
}

export default RecipeController;
