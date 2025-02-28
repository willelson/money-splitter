import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

import { appRouter } from "./routers/index";

const app = express();

app.options("*", cors());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/api", createExpressMiddleware({ router: appRouter }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export type AppRouter = typeof appRouter;
