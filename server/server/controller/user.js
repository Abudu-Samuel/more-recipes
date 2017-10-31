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
    const { username, email, password } = req.body;

    if (!username) {
      errors.push('Username is required');
    }
    if (!email) {
      errors.push('Email required');
    }
    if (!password) {
      errors.push('password is required');
    }
    if (errors.length > 0) {
      return res.status(400).send({
        message: errors
      });
    }
    return users
      .create({
        username,
        password: bcrypt.hashSync(req.body.password, 10),
        email
      })
      .then(register => res.status(201).send(register))
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(400).send({
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

    if (!email) {
      errors.push('Email is required');
    }
    if (!password) {
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
              token
            });
          }
          res.status(400).send({
            message: 'Wrong password'
          });
        }
      })
      .catch(error => res.status(400).send({
        message: 'Cannot create an account, try again'
      }));
  }
}

export default UserController;

