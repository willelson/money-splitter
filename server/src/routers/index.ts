import { t } from "../trpc";
import { groupRouter } from "./groups";

export const appRouter = t.router({
  groups: groupRouter,
});
