import jwt from 'jsonwebtoken';

require('dotenv').config();
/**
 * @returns {Object} ensureUser
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const key = process.env.SECRET_KEY;

/**
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {Objet} authenticate
 */
const authenticate = (req, res, next) => {
  let verified;
  try {
    verified = jwt.verify(req.token, key);
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

export default authenticate;
