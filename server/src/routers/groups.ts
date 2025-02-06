import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../trpc";

import {
  addUserToGroup,
  createGroup,
  getGroup,
  getGroups,
} from "../db/utils/groups";
import { createUser } from "../db/utils/users";

export const groupRouter = t.router({
  get: t.procedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const group = await getGroup(input.code);
      if (!group) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Group not found",
        });
      }
      return group;
    }),

  getMany: t.procedure
    .input(z.object({ codes: z.array(z.string()) }))
    .query(async ({ input }) => {
      const groups = await getGroups(input.codes);
      return groups;
    }),

  create: t.procedure
    .input(z.object({ name: z.string(), users: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const newGroup = await createGroup(input.name);

      input.users.forEach(async (userName) => {
        const user = await createUser(userName);
        await addUserToGroup(newGroup.id, user.id);
      });

      const updatedGroup = await getGroup(newGroup.code);

      if (updatedGroup === undefined) {
        // TODO: refine this error
        throw Error("Problem fetching newly created group");
      }

      return updatedGroup;
    }),
});
