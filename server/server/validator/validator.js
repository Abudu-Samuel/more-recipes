/**
 *@returns {xzv} klldf
 * @param {jks} param0
 */
const validateInput = ({
  name, description, directions, ingredients
}) => {
  if (name === undefined || name === '') return { valid: false, message: 'Name field is required.', status: 400 };
  if (description === undefined || description === '') return { valid: false, message: 'Description field is required.', status: 400 };
  if (ingredients === undefined || ingredients === '') return { valid: false, message: 'Input you', status: 400 };
  if (directions === undefined || directions === '') return { valid: false, message: 'Give your users some desired instructions', status: 400 };
  return { valid: true };
};

export default validateInput;
