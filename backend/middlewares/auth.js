const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError ');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Нужно авторизоватся'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_SECRET
        : 'dev-secret',
    );
  } catch (err) {
    return next(new UnauthorizedError('Нужно авторизоватся'));
  }

  req.user = payload;

  return next();
};
