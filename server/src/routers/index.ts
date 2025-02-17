import { t } from "../trpc";
import { groupRouter } from "./groups";
import { transactionRouter } from "./transactions";

export const appRouter = t.router({
  groups: groupRouter,
  transactions: transactionRouter,
});
