const validation = {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} recipeId
   */
  recipeId(req, res, next) {
    console.log(req.params.recipeId, '===================================');
    const { recipeId } = req.params;

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
  userId(req, res, next) {
    const { userId } = req.params.userId;

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    next();
  },
};

export default validation;
