# Node Rest API

Для запуска проекта неоходимо:
- Установить пакеты
```sd
$ npm install
```
- Настроить файл .env:
1. Выбрать режим сборки (по умолчанию ```development```)
```sd
NODE_ENV=development
```
2. Порт (по умолчанию ```3000```)
```sd
PORT=3000
```
3. Тип базы данных (например ```mysql```,```postgresql```). Если режим сборки ```development```, то для подключения используйте поля с приставкой ```DEV```, если же режим сборки ```production``` -- ```PROD```
```sd
DEV_CLINET_DB=
...
PROD_CLINET_DB=
```
4. Имя базы данных, пользователя и пароль
```sd
DEV_DATABASE_DB=
DEV_USERNAME_DB=
DEV_PASSWORD_DB=
...
PROD_DATABASE_DB=
PROD_USERNAME_DB=
PROD_PASSWORD_DB=
```
5. Относительный путь к папке с миграциями и сидами (по умолчанию ```/database/migrations``` и ```/database/seeds```)
```sd
DEV_PATH_MIGRATIONS=/database/migrations
DEV_PATH_SEEDS=/database/seeds
...
PROD_PATH_MIGRATIONS=/database/migrations
PROD_PATH_SEEDS=/database/seeds
```
- Запускаем миграции и сиды
```sd
$ node_modules/.bin/knex migrate:latest
$ node_modules/.bin/knex seed:run
```
- Для старта проекта
```sd
$ npm start
```
# Тестирование

Для тестирования необходимо:
- Настроить файл .env:
1. Поменять режим сборки на ```test```
```sd
NODE_ENV=test
```
2. Настроить подключение к БД
```sd
TEST_CLINET_DB=
TEST_DATABASE_DB=
TEST_USERNAME_DB=
TEST_PASSWORD_DB=
```
3. Путь к папкам с миграциями и сидами (по умолчанию ```/database/migrations``` и ```/database/seeds```)
```sd
TEST_PATH_MIGRATIONS=/database/migrations
TEST_PATH_SEEDS=/database/seeds
```
- Начать тестирование:
```sd
$ npm test
```