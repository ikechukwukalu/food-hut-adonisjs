# Food Hut

[![Quality Score](https://img.shields.io/scrutinizer/quality/g/ikechukwukalu/food-hut-adonisjs/main?style=flat-square)](https://scrutinizer-ci.com/g/ikechukwukalu/food-hut-adonisjs/)
[![Code Quality](https://img.shields.io/codefactor/grade/github/ikechukwukalu/food-hut-adonisjs?style=flat-square)](https://www.codefactor.io/repository/github/ikechukwukalu/food-hut-adonisjs)
[![Github Workflow Status](https://img.shields.io/github/actions/workflow/status/ikechukwukalu/food-hut-adonisjs/foodhut.yml?branch=main&style=flat-square)](https://github.com/ikechukwukalu/food-hut-adonisjs/actions/workflows/foodhut.yml)

This is a sample REST API that returns JSON as a response.

## Requirements

- Node v16.17.0+
- AdonisJS 5
- MailHog
- MySQL

## Project setup

```shell
npm install
cp .env.example .env
node ace generate:key
node ace migration:fresh --seed
```

### Run development server

```shell
node ace serve --watch
```

### Run tests

```shell
node ace test
```

## Note

- Login credentials

```php
email: testmerchant@xyz.com
password: 12345678
```
