'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requireToken = function requireToken(req, res, next) {
  req.token = req.headers.token;
  if (!req.token) {
    var error = res.status(403).send({ message: 'Please Log in.' });
    return next(error);
  }
  return next();
};

exports.default = requireToken;