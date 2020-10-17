# Бэкэнд для проекта [News-explorer](https://github.com/v1ktorbro/news-explorer-frontend)

* **Репозиторий React приложения, использующее этот API [тут](https://github.com/v1ktorbro/news-explorer-frontend)**;

* **Приложение использующее этот API и размещенное на Яндекс.Облаке [тут](https://news.students.nomoreparties.co/)**;

## Используемый стэк :

**express.js, MongoDB, API REST, Yandex.Cloud**

## Публичные маршруты  
1. /signup регистрация пользователя в базе. 
POST запрос, в теле которого должно быть 3 поля: email, password(min 4 символа), name;
2. /signin авторизация юзера.
POST запрос, в теле которого должно быть 2 поля: email и password(min 4 символа).
**авторизация клиента происходит с помощью cookie**

### Запросы

Сервер принимает запросы на поддоменное имя по протоколу https *api.v1ktorbro.students.nomoreparties.co*

* **_https_ [api.news.students.nomoreparties.co](https://api.news.students.nomoreparties.co/users)**

* **Публчиный IPv4 178.154.224.47**

**_для статей**

      REST      |      Route            |         BODY          |  Result
                |                       |                       | 
      GET       |      '/articles'      |                       | все сохраненные статьи юзера;
      POST      |      '/articles'      | keyword, title, text, |
                                        |  date, source, link,  | создать статью;
                                        |  image                | 
      DELETE    |     '/articles/:id'   |                       | удалить свою статью;


**_для юзеров_**

      REST      |      Route         |         BODY          |  Result
                |                    |                       |
      GET       |    '/users/me'     |                       |  инфо о текущем юзере;
      


### Структура проекта

        controllers/     | обработчики карточек и юзеров;
        errors/          | конструкторы ошибок со статусами 400, 401, 403, 404, 409;
        middlewares/     | логгеры запросов и аунтефикация пользователя;
        models/          | схема модели карточки и юзера;
        routes/          | маршруты;
        logs/            | логи ошибок и запросов;
        .env             | генерация токена и его хранение в переменной окружения.

#### Немного о проекте

Руты статей и пользователей защищены авторизацией. 
Авторизация заключается в сохранении JWT токена в куках браузера и защитой его сгенерированным модулем [crypto](https://www.npmjs.com/package/crypto-js) 32байтным ключем шифрования, который хранится в переменной окружения в файле [.env](https://www.npmjs.com/package/dotenv)

### Авторы

* **Яндекс.Практикум** *гуру и наставник* - [Yandex.Practikum](https://praktikum.yandex.ru);

* **Виктор Абросимов** *писарь* - [linkedin](https://www.linkedin.com/in/victor-abrosimov-631b6b1a4/).
