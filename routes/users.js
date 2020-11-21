const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { getInfoUser } = require('../controllers/users');

router.get('/me', celebrate({
  body: Joi.object({
    _id: Joi.objectId(),
  }),
}), getInfoUser);

module.exports = router;
