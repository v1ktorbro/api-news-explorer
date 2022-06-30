# Бэк для проекта [NewsExplorer](https://github.com/v1ktorbro/news-explorer)
**[ Base URL: newsexplorer.abrosimov.site/api ]**

## Инструменты :
**EXPRESS,MONGO, NGINX, UBUNTU, POSTMAN.**

## Руты:

### Публичные:

* Авторизоваться

      POST /signin/{BODY}
      _____________________
      {BODY} = email, password, name

* Зарегистрироваться

      POST /signup/{BODY}
      _____________________
      {BODY} = email, password

### Приватные:
*P.S. Доступны только после авторизации и получении JWT*

#### /articles
* Получить все сохраненные карточки

      GET /articles

* Сохранить карточку

      POST /articles/{BODY}
      _____________________
      {BODY} = keyword, title, text, date, source, link

* Удалить карточку

      DELETE /articles/:id

#### /users
* Получить инфо о текущем аунтефицированном пользователе

      GET /users/me

### Структура проекта:
    controllers/     | обработчики карточек и юзеров;
    errors/          | конструкторы ошибок со статусами;
    middlewares/     | логгеры запросов и аунтефикация пользователя;
    models/          | схема модели карточки и юзера;
    routes/          | маршруты;
    logs/            | логи ошибок и запросов;
    .env             | генерация токена и его хранение в переменной окружения.

*[Репозиторий фронта](https://github.com/v1ktorbro/news-explorer)*
