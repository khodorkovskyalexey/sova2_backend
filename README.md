# Sova2 server

Default port: 8081

## How to start?

You need to clone repository:
`https://github.com/khodorkovskyalexey/sova2_backend.git`

In this folder you need to run:
`npm install`
or
`yarn install`

Then you need to execute the command for starting server:
`npm run dev`
or
`yarn dev`

## Endpoints

### Регистрация

#### `POST /register`

Request
```json
{
	"fio": "Peshkov Nikita",
	"email": "peshkov.nikita@mail.com",
	"password": "chabypeli10"
}
```

Resonse (если все ок)
```json
{
  "token": "23uige-jwr-flakj-dshja-ksfh",
  "status": 200
}
```
Response (если такой email уже существует)
```json
{
  "token": "",
  "status": 400
}
```

### Авторизация

#### `POST /auth`

Request
```json
{
	"email": "peshkov.nikita@mail.com",
	"password": "chabypeli10"
}
```

Resonse в случае успешной авторизации
```json
{
	"fio": "Peshkov Nikita",
	"token": "23uige-jwr-flakj-dshja-ksfh",
	"status": 200
}
```

Resonse в случае неуспешной авторизации
```json
{
	"fio": "",
	"token": "",
	"status": 400
}
```

### Создание теста

#### `POST /test`

Request
```json
{
  "title": "Какой-то заголовок",
  "subject": "Проектная деятельность",
  "author": "23uige-jwr-flakj-dshja-ksfh",
  "questions": [
    {
      "text": "Вопрос 1",
      "answers": [
        {
          "text": "Ответ 1 верный",
          "is_it_true": true
        },
        {
          "text": "Ответ 2 неверный",
          "is_it_true": false
        }
      ]
    },
    {
      "text": "Вопрос 2",
      "answers": [
        {
          "text": "Вопрос 1 неверный",
          "is_it_true": false
        },
        {
          "text": "Вопрос 2 верный",
          "is_it_true": true
        }
      ]
    }
  ]
}
```
