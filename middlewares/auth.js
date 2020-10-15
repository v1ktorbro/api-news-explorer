const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.authorization = (req, res, next) => {
  const payload = req.cookies.jwt;
  if (!payload) {
    throw new Unauthorized('Для продолжения необходимо авторизироваться');
  }
  return next();
};

// eslint-disable-next-line no-unused-vars
module.exports.getCurrentUserId = (req, res, next) => jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')._id;
