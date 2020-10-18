const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { usersRouter, articlesRouter } = require('./routes');
const { registerUser, login } = require('./controllers/users');
const { authorization, protectionLoginRoute, protectionRegisterRoute } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFound } = require('./errors/index');

const app = express();

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //  15 min
  max: 99,
  message: 'За последние 15 минут было сделано не менеее 100 запросов. В целях защиты системы от DoS-атак, пожалуйста, повторите запрос позже',
});

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());

app.use('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use(requestLogger);

app.post('/signup', protectionRegisterRoute, registerUser);
app.post('/signin', protectionLoginRoute, login);
app.use('/users', authorization, usersRouter);
app.use('/articles', authorization, articlesRouter);

// eslint-disable-next-line no-unused-vars
app.get('*', (req, res) => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.disable('etag');

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (message === 'jwt expired') {
    return res.status(401).send({ message: 'JWT просрочен' });
  }
  return res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT);
