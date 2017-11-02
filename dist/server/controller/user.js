'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var users = _models2.default.user;
/**
 * @class UserController
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'register',

    /**
     * @returns {*} register
     * @param {*} req
     * @param {*} res
     */
    value: function register(req, res) {
      var errors = [];
      var _req$body = req.body,
          username = _req$body.username,
          email = _req$body.email,
          password = _req$body.password,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName;


      if (!username || typeof username !== 'string') {
        errors.push('Username is required');
      }
      if (!email || typeof email !== 'string') {
        errors.push('Email required');
      }
      if (!password || typeof password !== 'string') {
        errors.push('password is required');
      }
      if (!firstName || typeof firstName !== 'string') {
        errors.push('first name is required');
      }
      if (!lastName || typeof lastName !== 'string') {
        errors.push('last name is required');
      }
      if (errors.length > 0) {
        return res.status(400).send({
          message: errors
        });
      }
      return users.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: _bcrypt2.default.hashSync(req.body.password, 10),
        email: email
      }).then(function (register) {
        return res.status(201).send({
          message: 'Signup successful',
          register: register
        });
      }).catch(function (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).send({
            message: 'Email already Exists!!!'
          });
        }
      });
    }
    /**
       * @returns {*} login
       * @param {*} req
       * @param {*} res
       */

  }, {
    key: 'login',
    value: function login(req, res) {
      var errors = [];
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;


      if (!email || typeof email !== 'string') {
        errors.push('Email is required');
      }
      if (!password || typeof password !== 'string') {
        errors.push('password is required');
      }
      if (errors.length > 0) {
        return res.status(400).send({
          message: errors
        });
      }
      return users.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (found) {
        if (found === null) {
          res.status(400).send({
            message: 'User does not exist!'
          });
        } else {
          var hashedPassword = _bcrypt2.default.compareSync(req.body.password, found.password);
          if (hashedPassword) {
            var token = _jsonwebtoken2.default.sign({ id: found.id }, 'Test');
            return res.status(200).send({
              messsage: 'login successful',
              Token: token
            });
          }
          res.status(400).send({
            message: 'Wrong password'
          });
        }
      }).catch(function () {
        return res.status(400).send({
          message: 'Some error occured'
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;