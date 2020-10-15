const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { getCurrentUserId } = require('../middlewares/auth');
const { NotFound, EmailError } = require('../errors/index');

module.exports.getInfoUser = (req, res, next) => {
  User.findById(getCurrentUserId(req)).then((user) => {
    if (!user) {
      throw new NotFound('Неправильно передан id пользователя');
    }
    return res.status(200).send(user);
  }).catch(next);
};

module.exports.registerUser = (req, res, next) => {
  const { password, name } = req.body;
  const email = req.body.email.toLowerCase();
  User.findOne({ email }).then((findEmail) => {
    if (findEmail) {
      throw new EmailError(`${findEmail} уже зарегистрирован`);
    }
    return bcrypt.hash(password, 10).then((hash) => {
      User.create({ email, password: hash, name }).then((user) => {
        res.status(201).send({ email: user.email, name: user.name });
      }).catch(next);
    });
  }).catch(next);
};

module.exports.login = (req, res, next) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  User.findUserByCredentials(email, password).then((token) => {
    res.status(200).cookie('jwt', token, {
      maxAge: 3600000 * 24,
      httpOnly: true,
      sameSite: true,
    }).end();
  }).catch(next);
};
