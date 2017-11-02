import db from '../models/';

const recipes = db.recipe;
const favorites = db.favorite;

/**
 * @class FavoriteController
 */
class FavoriteController {
  /**
   * @static
   * @returns {Object} addFavorites
   * @param {Object} req
   * @param {Object} res
   * @memberof FavoriteController
   */
  static addFavorite(req, res) {
    if (Number.isNaN(req.params.recipeId)) {
      return res.status(400).send({
        message: 'Paramater must be a Number'
      });
    }
    return recipes
      .findById(parseInt(req.params.recipeId, 10))
      .then(recipeFound => {
        if(found) {
          favorites.findOne({
            where: {
              recipeId: req.params.recipeId,
              user
            }
          })
        }
      })
  }
}

export default FavoriteController;
