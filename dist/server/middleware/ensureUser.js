'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @returns {Object} ensureUser
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
var ensureUser = function ensureUser(req, res, next) {
  var verified = void 0;
  try {
    verified = _jsonwebtoken2.default.verify(req.token, 'Test');
  } catch (error) {
    var err = res.status(400).send({ error: error });
    return next(err);
  }
  if (!verified.id) {
    return res.status(403).send({ message: 'Incorrect user.' });
  }
  req.userId = verified.id;
  return next();
};

exports.default = ensureUser;