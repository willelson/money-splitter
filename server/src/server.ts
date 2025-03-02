import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

import { appRouter } from "./routers/index";

const app = express();

// app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(cors());
app.options("*", cors());
app.use("/api", createExpressMiddleware({ router: appRouter }));

const PORT = process.env.PORT || 3000;
console.log(`PORT = ${PORT}`);

app.get("/test", (_, res) => {
  res.send(`PORT = ${PORT}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export type AppRouter = typeof appRouter;
