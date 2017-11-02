'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
  * @returns { Object } validateSignup
  *
  *
  */
var validateSignup = function validateSignup(_ref) {
  var email = _ref.email,
      password = _ref.password,
      username = _ref.username;

  if ((password === undefined || password === '') && (email === undefined || email === '') && (username === undefined || email === '')) return { valid: false, message: 'username, email and password fields are required', status: 400 };
  if (email === undefined || email === '') return { valid: false, message: 'Please enter an Email Address.', status: 400 };
  if (password === undefined || password === '') return { valid: false, message: 'Password is required.', status: 400 };
  if (username === undefined || username === '') return { valid: false, message: 'Username is required', status: 400 };

  return { valid: true };
};

exports.default = validateSignup;