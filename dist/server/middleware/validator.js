'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validation = {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} recipeId
   */
  recipeId: function recipeId(req, res, next) {
    console.log(req.params.recipeId, '===================================');
    var recipeId = req.params.recipeId;


    if (parseInt(recipeId, 10) === 'NaN') {
      console.log('hello ****====================*************()()())()(()()(');
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    next();
  },

  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} userId
   */
  userId: function userId(req, res, next) {
    var userId = req.params.userId.userId;


    if (Number.isNaN(userId)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    next();
  }
};

exports.default = validation;