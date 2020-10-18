const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getInfoUser } = require('../controllers/users');

router.get('/me', celebrate({
  cookies: Joi.object({
    jwt: Joi.string().required(),
  }),
}), getInfoUser);

module.exports = router;
