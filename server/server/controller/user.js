// import bcrypt from 'bcrypt';
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
    const { username, password, email } = req.body;
    return users
      .create({
        username,
        password,
        email
      })
      .then(register => res.status(201).send(register))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
  /**
     * @returns {*} login
     * @param {*} req
     * @param {*} res
     */
  static login(req, res) {
    return users
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((found) => {
        res.status(200).send({
          message: 'Login successful'
        });
      })
      .catch(error => res.status(400).send(error));
  }
}

export default UserController;
