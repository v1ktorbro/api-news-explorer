const User = require('../models/user');

module.exports.getInfoUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      //throw new Error
    }
    return res.status(200).send(user);
  }).catch(next);
};
