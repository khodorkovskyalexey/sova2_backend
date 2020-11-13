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

For lint anf format code use to:
`yarn lint`
or
`npm run dev`

## Endpoints

### Авторизация/регистрация

#### `POST /auth`
Авторизация

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
	"token": "4c4dd504-2622-5ee9-bd53-fb905047e934",
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

#### `POST /register`
Регистрация

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
  "token": "4c4dd504-2622-5ee9-bd53-fb905047e934",
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

### Тесты глазами преподавателя

#### `POST /tests`
Создание теста

Request
```json
{
  "title": "Какой-то заголовок",
  "subject": "Проектная деятельность",
  "author": "4c4dd504-2622-5ee9-bd53-fb905047e934",
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
