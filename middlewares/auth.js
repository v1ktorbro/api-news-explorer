const jwt = require('jsonwebtoken');

module.exports.authorization = (req, res, next) => {
  const payload = req.cookies.jwt;
  if (!payload) {
    //throw new Unauhorized
    return console.log('АВТОРИЗИРУЙСЯ, ХОЛОП!')
  }
  return next();
};
