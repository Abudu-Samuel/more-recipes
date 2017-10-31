import jwt from 'jsonwebtoken';

const ensureUser = (req, res, next) => {
  let verified;
  try {
    verified = jwt.verify(req.token, 'Test');
  } catch (e) {
    const err = res.status(400).send({ e });
    return next(err);
  }
  if (!verified.id) {
    return res.status(403).send({ message: 'Incorrect user.' });
  } 
    req.userId = verified.id;
    return next();
  
};

export default ensureUser;
