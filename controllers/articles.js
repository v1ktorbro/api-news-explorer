const Article = require('../models/article');
const { getCurrentUserId } = require('../middlewares/auth');

module.exports.getArticlesUser = (req, res, next) => {
  Article.find({}).then((articles) => {
    if (!articles) {
      //throw new NotFound
      res.send('нет ничего чувак')
    }
    return res.status(200).send(articles);
  }).catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: getCurrentUserId(req),
  }).then((article) => res.status(201).send(article)).catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { id } = req.params;
  Article.findOne({ _id: id }).then((article) => {
    if (!article) {
      //throw new статья не сущ или удалена
      res.send('нет ничего чувак')
    }
    //сделать проверку currentCard.owner.toString() !== req.user._id и кинуть Forbidden
    return Article.deleteOne({ _id: id }).then(() => res.status(200).send(`Карточка ${id} удалена`));
  }).catch(next);
};
