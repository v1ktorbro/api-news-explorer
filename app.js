const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { usersRouter, articlesRouter } = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер работает на ${PORT} порту `);
});
