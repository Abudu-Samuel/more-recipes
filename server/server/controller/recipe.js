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
    console.log('===============', req.body);
    const {
      name, ingredients, description, directions, imageurl, userId
    } = req.body;
    return recipes
      .create({
        name,
        ingredients,
        description,
        directions,
        imageurl,
        userId
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
      .find({
        where: {
          id: req.params.recipeId,
        }
      })
      .then((found) => {
        if (!found) { 
          return res.status(404).send({
            message: 'Recipe not Found'
          });
        } else if (found.userId != parseInt(req.body.userId, 10)) {
          res.status(400).send('error');
        }
        return recipes
          .update({
            name,
            ingredients,
            description,
            directions,
            imageurl
          })
          .then((updatedRecipe) => {
            res.status(200).send(updatedRecipe);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}

export default RecipeController;
