# Expense Splitting App

This is a simple expense splitting app using [Drizzle ORM](https://orm.drizzle.team/docs/overview), [Postgres](https://www.postgresql.org/), [tRPC](https://trpc.io/), [Express JS](https://expressjs.com/) and [React](https://react.dev/).

The UI is inspired heavily by [Splid](https://splid.app/).

## Getting Started

### Run the project locally

The easiest way to run the project is using Docker.

First, create a `.env` in the root directory with the credentials for the postres database.

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=postgres
```

Build the server files, as the frontend depends on them

```
cd server && npm install && npm run build
```

Then spin up the project from the root directory with `docker-compose`

```
docker-compose build
docker-compose up
```

The app should now be running at [http://localhost:4173](http://localhost:4173).
