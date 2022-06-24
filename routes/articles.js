const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { getArticlesUser, createArticle, deleteArticle } = require('../controllers/articles');

const regExForLink = /^(https?:\/{2})?([\da-zа-я\.-]+)\.([\S]{2,})([\/\w \.-]*)*\/?$/;

router.get('/', getArticlesUser);

router.post('/', celebrate({
  body: Joi.object({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().regex(regExForLink).required(),
    image: Joi.string().regex(regExForLink).required(),
  }),
}), createArticle);

router.delete('/:id', celebrate({
  params: Joi.object({
    id: Joi.objectId(),
  }),
}), deleteArticle);

module.exports = router;
