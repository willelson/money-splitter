import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

import { appRouter } from "./routers/index.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/api", createExpressMiddleware({ router: appRouter }));

app.listen(3000);

export type AppRouter = typeof appRouter;
