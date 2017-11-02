'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *@returns {xzv} klldf
 * @param {jks} param0
 */
var validateInput = function validateInput(_ref) {
  var name = _ref.name,
      description = _ref.description,
      directions = _ref.directions,
      ingredients = _ref.ingredients;

  if (name === undefined || name === '') return { valid: false, message: 'Name field is required.', status: 400 };
  if (description === undefined || description === '') return { valid: false, message: 'Description field is required.', status: 400 };
  if (ingredients === undefined || ingredients === '') return { valid: false, message: 'Input you', status: 400 };
  if (directions === undefined || directions === '') return { valid: false, message: 'Give your users some desired instructions', status: 400 };
  return { valid: true };
};

exports.default = validateInput;