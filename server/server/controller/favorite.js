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
      .then((recipeFound) => {
        if (recipeFound) {
          favorites.findOne({
            where: {
              recipeId: req.params.recipeId,
              userId: req.userId
            }
          })
            .then((foundFavorite) => {
              if (foundFavorite) {
                return res.status(400).send({
                  message: 'Recipe already favorited'
                });
              }
              return favorites
                .create({
                  recipeId: req.params.recipeId,
                  userId: req.userId
                    .then(favorited => res.status(201).send({
                      message: 'Recipe has been favorited',
                      favorited
                    }))
                });
            });
        }
        return res.status(400).send({
          message: 'Recipe not Found'
        });
      });
  }
  /**
   * @static
   * @param {Obj} res
   * @param {Obj} req
   * @returns {Obj} getFavorite
   * @memberof FavoriteController
   */
  static getFavorite(res, req) {
    if (Number.isNaN(req.params.recipeId)) {
      return res.status(400).send({
        message: 'Parameter must be a number!'
      });
    }
    return favorites
      .findAll({
        where: {
          userId: req.userId
        },
        include: [
          {
            model: recipes
          }
        ]
      })
      .then((found) => {
        if (found) {
          return res.status(200).send(found);
        }
        return res.status(404).send({
          message: 'Recipe not found'
        });
      });
  }
}

export default FavoriteController;
