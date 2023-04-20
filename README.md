# Bizcuit TODO App
## Description
A basic todo app backend developed in NestJS to manage tasks with the ability to
add details, deadlines and marking them as complete when the task is done.
Multiple tasks can be grouped into a single unified list for better management.

## Main features and other information:
- Typescript
- TypeORM for MySQL
- Passport and JWT token for authentication/authorization
- Modules are used to organize the code efficiently
- Basic authentication is implemented in `src/user/user.service.ts` with hardcoded credentials values
- For performance, In-memory caching is employed with cache expires to serve the users with in the best possible time, 
without serving the stale results.

## Following endpoints are exposed by the API:
### auth:
| Route       | Method | Description            |
|-------------|--------|------------------------|
| /auth/login | POST   | login to get jwt token |

### todo:
| Route      | Method | Description    |
|------------|--------|----------------|
| /todo/{id} | GET    | Get todo by id |
| /todo      | GET    | Get all todos |
| /todo      | POST   | Create a todo |
| /todo/{id} | PUT    | Update a todo |
| /todo/{id} | DELETE | Delete a todo |

### list:
| Route      | Method | Description    |
|------------|--------|----------------|
| /list/{id} | GET    | Get list by id |
| /list      | GET    | Get all lists  |
| /list      | POST   | Create a list  |
| /list/{id} | PUT    | Update a list  |
| /list/{id} | DELETE | Delete a list  |

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
