const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.authorization = (req, res, next) => {
  const payload = req.cookies.jwt;
  if (!payload) {
    //throw new Unauhorized
    return console.log('АВТОРИЗИРУЙСЯ, ХОЛОП!')
  }
  return next();
};

module.exports.getCurrentUserId = (req, res, next) => jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')._id;
