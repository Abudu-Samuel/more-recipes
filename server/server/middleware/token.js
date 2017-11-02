const requireToken = (req, res, next) => {
  req.token = req.headers.token;
  if (!req.token) {
    const error = res.status(403).send({ message: 'Please Log in.' });
    return next(error);
  }
  return next();
};

export default requireToken;
