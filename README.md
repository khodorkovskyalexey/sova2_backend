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
`npm run lint`

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

#### `POST /:token/tests`
Создание теста

Request
```json
{
  "title": "Какой-то заголовок",
  "subject": "Проектная деятельность",
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

### `DELETE /:token/tests/:test_id`
Удаление теста

#### `GET /:token/tests`
Получение всех тестов конкретного преподавателя (для главной страницы)

Response
```json
[
  {
    "subject": "Компьютерные сети",
    "tests": [
      {
        "title": "Контрольная работа 1",
        "test_id": "fads-r32fsa-32-fdsaf-ssa"
      },
      {
        "title": "Контрольная работа 2",
        "test_id": "432fff21-432a-32-f321f-2"
      }
    ]
  },
  {
    "subject": "Английский язык",
    "tests": [
      {
        "title": "-ing",
        "test_id": "fads-r32fsa-32fdas-sa"
      },
      {
        "title": "-ed",
        "test_id": "432111fds1--ffd321f-2"
      }
    ]
  }
]
```

#### `GET /:token/result/:test_id`
Получение результатов студентов по конкретному тесту

Response
```json
[
    {
        "group": "Группа",
        "students": [
            {
                "fio": "Фамилия Имя Отчество",
                "mark": 100
            },
            {
                "fio": "Ашан",
                "mark": 50
            }
        ]
    },
    {
        "group": "Волк одиночка",
        "students": [
            {
                "fio": "Серега",
                "mark": 50
            }
        ]
    }
]
```

### Тесты глазами студента

#### `GET /tests/:test_id`
Получение конкретного теста

Response
```json
{
    "title": "Жизнь в центре Московки",
    "subject": "Окружающий мир",
    "author": {
        "fio": "Халитов Ильяс Политехович"
    },
    "questions": [
        {
            "id": 3,
            "text": "Двадцатка это - ?",
            "answers": [
                {
                    "id": 6,
                    "text": "Автобус"
                },
                {
                    "id": 7,
                    "text": "Две склеенные 10 рублевые монеты"
                },
                {
                    "id": 8,
                    "text": "Пиво Балтика20"
                }
            ]
        },
        {
            "id": 4,
            "text": "Ты просто космос, ...!",
            "answers": [
                {
                    "id": 9,
                    "text": "Станислав"
                },
                {
                    "id": 10,
                    "text": "Вячеслав"
                },
                {
                    "id": 11,
                    "text": "Московка"
                }
            ]
        }
    ]
}
```

#### `POST /tests/:test_id`
Проверка решенного теста
Оценивается по 100-балльной шкале!

Request
```json
{
  "student": {
    "fio": "Фамилия Имя Отчество",
    "group": "Группа"
  },
  "questions": [
    {
      "id": 3,
      "answers": [3, 4, 5]
    },
    {
      "id": 4,
      "answers": [9]
    }
  ]
}
```

Response
```json
{
    "mark": 100
}
```
