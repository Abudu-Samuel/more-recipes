const requireToken = (req, res, next) => {
  req.token = req.header.token || req.body.token || req.query.token;
  if (!req.token) {
    const error = res.status(403).send({ message: 'Please Log in.' });
    return next(error);
  }
  return next();
};

export default requireToken;
