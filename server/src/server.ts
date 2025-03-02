import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

import { appRouter } from "./routers/index";

const app = express();

// app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(cors());
app.options("*", cors());
app.use("/api", createExpressMiddleware({ router: appRouter }));

// const PORT = parseInt(process.env.PORT) || 3000;

let port = 3000;

if (process.env.PORT) {
  port = parseInt(process.env.PORT);
}

console.log(`port = ${port}`);

app.get("/test", (_, res) => {
  res.send(`port = ${port}`);
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Server running on port ${port}`)
);

export type AppRouter = typeof appRouter;
