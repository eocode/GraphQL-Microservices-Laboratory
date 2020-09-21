<div align="center">
  <img width="200" src="https://camo.githubusercontent.com/0d358238ba8c67946e6555aad926b947e1a5048f/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f5f746578742e737667" alt="Queens">
  <h3 align="center">Nest cookiecutter Activando Ideas</h3>
  <p align="center">
    <a href="https://github.com/eocode/Queens/blob/master/LICENSE" target="__blank">
      	<img src="https://img.shields.io/badge/License-BSD3-blue.svg"  alt="license badge"/>
    </a>
  </p>
</div>
## Features

- GraphQL w/ [playground](https://github.com/prisma/graphql-playground)
- Code-First w/ [decorators](https://docs.nestjs.com/graphql/quick-start#code-first)
- [Prisma](https://www.prisma.io/) for database modelling, migration and type-safe access (Postgres, MySQL & MongoDB)
- JWT authentication w/ [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- REST API docs w/ [Swagger](https://swagger.io/)

## Overview

- [Features](#features)
- [Overview](#overview)
- [Local setup](#local-setup)
  - [Basic configuration](#basic-configuration)
    - [1. Install Dependencies](#1-install-dependencies)
    - [2. Install Nestjs CLI](#2-install-nestjs-cli)
- [Rename .env files](#rename-env-files)
- [Prisma](#prisma)
  - [1. Prisma2: Prisma Migrate -- Experimental feature](#1-prisma2-prisma-migrate----experimental-feature)
  - [2. Prisma2: Prisma Client JS](#2-prisma2-prisma-client-js)
  - [3. Seed the database data with this script](#3-seed-the-database-data-with-this-script)
  - [4. Prisma studio](#4-prisma-studio)
- [Start NestJS Server](#start-nestjs-server)
- [Playground](#playground)
- [Rest Api](#rest-api)
- [Docker](#docker)
- [Schema Development](#schema-development)
- [NestJS - Api Schema](#nestjs---api-schema)
  - [Resolver](#resolver)
- [Demo](#demo)
- [Credits](#credits)

## Local setup

### Basic configuration

#### 1. Install Dependencies

Install the dependencies for the nest server:

```bash
npm install
```

#### 2. Install Nestjs CLI

The [Nestjs CLI](https://docs.nestjs.com/cli/usages) can be used to generate controller, services, resolvers and more.

```bash
npm i -g @nestjs/cli
```

## Rename .env files

There are two files called example.env in root and /prisma

* Rename only to .env and setup your files

## Prisma

Prisma vs ORMs

<div align="center">
<img src="https://imgur.com/2JtwqGm.png">
</div>

### 1. Prisma2: Prisma Migrate -- Experimental feature

> As function is experimental, this project include database.sql to create schema and then run ``prisma inspect`` to generate prisma schema. 

<div align="center">
<img src="https://imgur.com/OImder6.png">
</div>

[Prisma Migrate](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate) is used to manage the schema and migration of the database.

> Read how to use experimental feature

Create the migration of the database:

```bash
npx prisma migrate save --experimental
# or
npm run prisma:save
```

Apply the database migration:

```bash
npx prisma migrate up --experimental
# or
npm run prisma:up
```

### 2. Prisma2: Prisma Client JS

[Prisma Client JS](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/api) is a type-safe database client auto-generated based on the data model.

To generate Prisma Client JS execute, this will always be executed after `npm install`:

```bash
npx prisma generate
# or
npm run prisma:generate
```

### 3. Seed the database data with this script

Execute the script with this command:

```bash
npm run seed
```

### 4. Prisma studio

```bash
npx prisma studio --experimental
```

## Start NestJS Server

Run Nest Server in Development mode:

```bash
npm run start

# watch mode
npm run start:dev
```

Run Nest Server in Production mode:

```bash
npm run start:prod
```

Playground for the NestJS Server is available here: http://localhost:3000/graphql

## Playground

Some queries and mutations are secured by an auth guard. You have to acquire a JWT token from `signup` or `login`. Add the the auth token as followed to **HTTP HEADERS** in the playground and replace `YOURTOKEN` here:

```json
{
  "Authorization": "Bearer YOURTOKEN"
}
```

## Rest Api

[RESTful API](http://localhost:3000/api) documentation available with Swagger.

http://localhost:3000/api

## Docker

Nest serve is a Node.js application and it is easily [dockerized](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/).

See the [Dockerfile](./Dockerfile) on how to build a Docker image of your Nest server.

Now to build a Docker image of your own Nest server simply run:

```bash
# give your docker image a name
docker build -t <your username>/nest-prisma-server .
# for example
docker build -t nest-prisma-server .
```

After Docker build your docker image you are ready to start up a docker container running the nest server:

```bash
docker run -d -t -p 3000:3000 --env-file .env nest-prisma-server
```

Now open up [localhost:3000](http://localhost:3000) to verify that your nest server is running.

## Schema Development

Update the Prisma schema `prisma/schema.prisma` and after that run the following two commands:

```bash
npx prisma generate
# or in watch mode
npx prisma generate --watch
# or
npm run prisma:generate
npm run prisma:generate:watch
```

## NestJS - Api Schema

The [schema.graphql](./src/schema.graphql) is generated with [code first approach](https://docs.nestjs.com/graphql/quick-start#code-first). The schema is generated from the [models](./src/models/user.ts), the [resolvers](./src/resolvers/auth/auth.resolver.ts) and the [input](./src/resolvers/auth/dto/login.input.ts) classes.

You can use [class-validator](https://docs.nestjs.com/techniques/validation) to validate your inputs and arguments.

### Resolver

To implement the new query, a new resolver function needs to be added to `users.resolver.ts`.

```ts
@Query(returns => User)
async getUser(@Args() args): Promise<User> {
  return await this.prisma.client.user(args);
}
```

Restart the NestJS server and this time the Query to fetch a `user` should work.

## Demo

Home

<div align="center">
<img src="/img/1.png">
</div>

<div align="center">
<img src="/img/2.png">
</div>


## Credits

Template based on:

https://github.com/fivethree-team/nestjs-prisma-starter