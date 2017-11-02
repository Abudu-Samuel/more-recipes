import jwt from 'jsonwebtoken';
/**
 * @returns {Object} ensureUser
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const ensureUser = (req, res, next) => {
  let verified;
  try {
    verified = jwt.verify(req.token, 'Test');
  } catch (error) {
    const err = res.status(400).send({ error });
    return next(err);
  }
  if (!verified.id) {
    return res.status(403).send({ message: 'Incorrect user.' });
  }
  req.userId = verified.id;
  return next();
};

export default ensureUser;
