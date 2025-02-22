import { t } from "../trpc.js";
import { groupRouter } from "./groups.js";
import { transactionRouter } from "./transactions.js";

export const appRouter = t.router({
  groups: groupRouter,
  transactions: transactionRouter,
});
