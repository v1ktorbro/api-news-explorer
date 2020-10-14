const router = require('express').Router();
const { getArticlesUser, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticlesUser);
router.post('/', createArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
