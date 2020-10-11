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

### `POST /test`

Request = response

### `GET /test`

Response
~~~
{
    "to": "Serega",
    "from": "Leha",
    "message": "Salam alleikum",
    "level_of_respect": 1000
}
~~~