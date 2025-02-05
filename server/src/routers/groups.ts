import { z } from "zod";
import { t } from "../trpc";

import { addUserToGroup, createGroup, getGroup } from "../db/utils/groups";
import { createUser } from "../db/utils/users";

export const groupRouter = t.router({
  get: t.procedure
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
    .query(({ input }) => getGroup(input.code)),

  create: t.procedure
    .input(z.object({ name: z.string(), users: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const newGroup = await createGroup(input.name);

      input.users.forEach(async (userName) => {
        const user = await createUser(userName);
        await addUserToGroup(newGroup.id, user.id);
      });

      const updatedGroup = getGroup(newGroup.code);

      return updatedGroup;
    }),
});
