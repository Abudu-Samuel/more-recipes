import db from '../models/';

const recipes = db.recipe;
/**
 *@class RecipeController
 */
class RecipeController {
  /**
   * @returns {*} addRecipe
   * @param {*} req
   * @param {*} res
   */
  static addRecipe(req, res) {
    console.log('===============', req.body)
    // const {
    //   name, ingredients, description, directions, imageurl
    // } = req.body;
    return recipes
      .create({
        name: req.body.name,
        ingredients: req.body.ingredients,
        description: req.body.description,
        directions: req.body.directions,
        imageurl: req.body.imageurl,
        userId: req.body.userId
      })
      .then(addRecipe => res.status(201).send(addRecipe))
      .catch(error => res.status(400).send(error));
  }
}

export default RecipeController;
