const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.getInfoUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      //throw new Error
    }
    return res.status(200).send(user);
  }).catch(next);
};

module.exports.registerUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email }).then((findEmail) => {
    if (findEmail) {
      //такой имейл уже есть
      return console.log('такой имейл уже есть');
    }
    return bcrypt.hash(password, 10).then((hash) => {
      User.create({ email, password: hash, name }).then((user) =>
      res.status(201).send(user)).catch(next)
    });
  }).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password).then((token) => {
    res.status(200).cookie('jwt', token, {
      maxAge: 3600000 * 24,
      httpOnly: true,
      sameSite: true,
    }).end();
  }).catch(next);
};
