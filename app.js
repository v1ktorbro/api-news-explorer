const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { usersRouter, articlesRouter } = require('./routes');
const { registerUser, login } = require('./controllers/users');
const { authorization } = require('./middlewares/auth');
const { NotFound } = require('./errors/index');

const app = express();
app.use(cookieParser());

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', registerUser);
app.post('/signin', login);
app.use('/users', authorization, usersRouter);
app.use('/articles', authorization, articlesRouter);

// eslint-disable-next-line no-unused-vars
app.get('*', (req, res) => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер работает на ${PORT} порту `);
});
