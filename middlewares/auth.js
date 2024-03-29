const jwt = require('jsonwebtoken');
const { celebrate, Joi } = require('celebrate');
const { Unauthorized } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.authorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized('Для продолжения необходимо авторизоваться');
  }
  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  if (!payload) {
    throw new Unauthorized('Для продолжения необходимо авторизоваться');
  }
  req.user = payload;
  return next();
};

module.exports.protectionRegisterRoute = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.protectionLoginRoute = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
});

module.exports.getCurrentUserId = (req) => jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')._id;
