# Expense Splitting App

This is a simple expense splitting app that makes it easy to track shared costs, record payments, and see who owes what.

The UI is inspired heavily by [Splid](https://splid.app/).

### Features

- Create groups with multiple users to track expenses.
- No sign in or authentication required. Groups are accessed by a uniquely generated code, making them easy to share.
- Easily see who owes what in the balances section off the group overview.
  <img width="1025" alt="overview" src="https://github.com/user-attachments/assets/3cb14f2d-e7de-4e4b-848d-c2f2515d7486" />

- View, search and delete groups transactions.
  <img width="1025" alt="transactions" src="https://github.com/user-attachments/assets/271c04a4-0e0d-42ee-9622-a230a5444cb8" />

### Technology

#### Frontend

- [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/) frontend.
- [Zustand](https://zustand.docs.pmnd.rs/) state management.
- [React Query](https://trpc.io/docs/client/tanstack-react-query/setup) query management.
- [Tailwind CSS](https://tailwindcss.com/) styling.

#### Server

- [Express JS](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/) server.
- [Drizzle ORM](https://orm.drizzle.team/docs/overview) database management.
- [Postgres](https://www.postgresql.org/) database.
- [tRPC](https://trpc.io/) end-to-end typesafe API.

## Getting Started

### Run the project locally

The easiest way to run the project is using Docker. Spin up the project from the root directory with `docker-compose`

```
docker-compose build
docker-compose up
```

The app should now be running at [http://localhost:4173](http://localhost:4173).

### Local development

First, spin up a Postres database.

```
docker run -d \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -p 5432:5432 \
  postgres
```

Then create a `.env` in the `/server` directory.

```
POSTGRES_PASSWORD='mysecretpassword'
FRONTEND_URL='http://localhost:5173'
```

Install the dependencies.

```
cd server
npm install
```

Create the database tables.

```
npm run drizzle:migrate
```

And then run the api server.

```
npm run dev
```

Now create a `.env` in the `/frontend` directory.

```
VITE_SERVER_URL='http://localhost:3000/api'
```

Then install the dependencies and run the server

```
cd frontend
npm install
npm run dev
```

The app should now be running at [http://localhost:5173](http://localhost:5173).

To start up [drizzle-kit studio](https://orm.drizzle.team/docs/drizzle-kit-studio), from the `/server` directory run

```
npx drizzle-kit studio
```
