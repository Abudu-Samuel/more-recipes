import recipes from '../model/recipe';
import validator from '../validator/validator';
/**
 * @class recipe
 */
class Recipe {
  /**
   * @returns {Object} recipes
   * @param {*} req
   * @param {*} res
   */
  static getRecipe(req, res) {
    if (req.query.sort === 'upvotes') {
      if (req.query.order === 'desc') {
        recipes.sort((recipe1, recipe2) => recipe1.upvotes > recipe2.upvotes);
      } else {
        recipes.sort((recipe1, recipe2) => recipe1.upvotes < recipe2.upvotes);
      }
    }
    return res.status(200).json({
      recipes
    });
  }
  /**
   * @returns {Object} createRecipes
   * @param {*} req
   * @param {*} res
   */
  static createRecipes(req, res) {
    const validate = validator(req.body);
    const recipe = Object.assign({}, req.body, {
      upvotes: 0,
      downvotes: 0,
      favorited: 0,
      views: 0,
    });
    if (validate.valid) {
      recipes.push(recipe);
      return res.status(201).json({
        feed: recipes[recipes.length - 1],
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
  static modifyRecipes(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        recipes[i].name = req.body.name;
        recipes[i].description = req.body.description;
        recipes[i].image = req.body.image;
        recipes[i].ingredients = req.body.ingredients;
        recipes[i].directions = req.body.directions;
        return res.status(200).json({
          recipes: recipes[i],
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
  static removeRecipes(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        recipes.splice(i, 1);
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
  static retrieveRecipes(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        return res.status(200).json({
          recipes: recipes[i],
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
  static addReview(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].id === parseInt(req.params.recipeId, 10)) {
        console.log(recipes);
        recipes[i].reviews.push(req.body.reviews);
        return res.status(200).json({
          recipes: recipes[i],
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
}

export default Recipe;

