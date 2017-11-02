import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';

const users = db.user;
/**
 * @class UserController
 */
class UserController {
  /**
   * @returns {*} register
   * @param {*} req
   * @param {*} res
   */
  static register(req, res) {
    const errors = [];
    const {
      username, email, password, firstName, lastName
    } = req.body;

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
    return users
      .create({
        username,
        firstName,
        lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email
      })
      .then(register => res.status(201).send({
        message: 'Signup successful',
        register
      }))
      .catch((error) => {
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
  static login(req, res) {
    const errors = [];
    const { email, password } = req.body;

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
    return users
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((found) => {
        if (found === null) {
          res.status(400).send({
            message: 'User does not exist!'
          });
        } else {
          const hashedPassword = bcrypt.compareSync(req.body.password, found.password);
          if (hashedPassword) {
            const token = jwt.sign({ id: found.id }, 'Test');
            return res.status(200).send({
              messsage: 'login successful',
              Token: token
            });
          }
          res.status(400).send({
            message: 'Wrong password'
          });
        }
      })
      .catch(() => res.status(400).send({
        message: 'Some error occured'
      }));
  }
}

export default UserController;

