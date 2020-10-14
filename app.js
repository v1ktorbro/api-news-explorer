const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер работает на ${PORT} порту `);
});
