<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

`npm i -g @nestjs/cli`  
`nest new nest-project`  
`nest g co /controllers/entities`  
`nest g service /service/fileName`  
`nest g module /module/fileName` 

#### Небольшой туториал
https://scotch.io/tutorials/getting-started-with-nestjs

#### Postman (примеры)
GET all - http://localhost:3000/api/users

GET one - http://localhost:3000/api/users/1

DELETE - http://localhost:3000/api/users?id=1

POST add one- http://localhost:3000/api/users
body: name=test8

PUT only - http://localhost:3000/api/users/1 (остальное в body)
body: name=test8

#### Работа с БД
sudo service mongod start

 
