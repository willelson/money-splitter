import { z } from "zod";
import { t } from "../trpc";

const groupProcedure = t.procedure;

export const groupRouter = t.router({
  getGroup: groupProcedure
    .input(z.object({ code: z.string() }))
    .query(({ input }) => {
      return {
        id: 13,
        code: input.code,
        name: "tRPC test",
        created_at: new Date("12 Jan 2025"),
        users: [
          { id: 1, name: "Anna" },
          { id: 2, name: "Pete" },
        ],
      };
    }),
});
