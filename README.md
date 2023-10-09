# Waiter Bet - Back-end

Back-end for Waiter Bet, a sports betting management solution.

## Table of Contents

- [About](#about)
- [How to run for development](#how-to-run-for-development)
- [How to run tests](#how-to-run-tests)
- [Building and starting for production](#building-and-starting-for-production)
- [Running migrations or generating Prisma clients](#running-migrations-prisma-clients)
- [Contact](#contact)

## About

Waiter Bet is a web browser application with which you can manage sports betting.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want.
This project supports 3 environments, production, development and test and it will be necessary to configure each of them separately, giving each of the databases appropriate names.

4. Configure the .env.development file using the .env.example file (see "Running application locally or inside docker section" for details)

5. Run all migrations

```bash
npm run dev:migration:run
```

6. Populate the database with the initial records using db Seed

```bash
npm run dev:seed
```

7. Run the backend in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section

2. Configure the `.env.test` file using the `.env.example` file (see the "Running the application locally or within docker" section for details).

3. Run all migrations:

```bash
npm run test:migration:run
```

4. Run test:

```bash
npm run test
```

## Building and starting for production

1. Follow the steps in the development section

2. Configure the .env.production file using the .env.example file (see "Running application locally or inside docker section" for details)

3. Run all migrations:

```bash
npm run prod:migration:run
```

4. Populate the database with the initial records using db Seed

```bash
npm run prod:seed
```

5. Building and starting for production

```bash
npm run build
npm start
```

## Running migrations Prisma clients

Before running migrations, make sure you have a running Postgres database based on the `.env.production` or `.env.development` or `.env.test` file for each environment.

1. Create 3 files in the root of the project (at the same level as the .env.example file) with the names:
 
- `.env.development`
- `.env.production`
- `.env.test`

2. Configure the `.env.development`, `.env.production` and `.env.test` files using the `.env.example` file.

3. Run all migrations:

- `npm run dev:migration:run` - runs migrations to the development environment by loading envs from the .env.development file. It uses [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) to load envs from the .env.development file.

- `npm run prod:migration:run` - same, but for production environment.
- `npm run test:migration:run` - same, but for test environment.

4. Populate the database with the initial records used for the proper functioning of the application, this record contains the Waiter bet account information.

- `npm run dev:seed` 

- `npm run prod:seed` - same, but for production environment.

## Contact

Feel free to reach out if you have any questions, suggestions, or feedback related to this project. I'm always open to collaborations and constructive discussions.

- Email: nishiyamaeel@gmail.com
- LinkedIn: <a href = "https://www.linkedin.com/in/alicia-nishiyama/"> alicia-nishiyama</a>
- GitHub: <a href="https://github.com/Nishiyama13/">Nishiyama13 </a>
 