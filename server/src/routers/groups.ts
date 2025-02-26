import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../trpc.js";

import {
  addUserToGroup,
  createGroup,
  getGroup,
  getGroups,
  updateGroupName,
} from "../db/utils/groups.js";
import { getUserBalances } from "../db/utils/transactions.js";
import { createUser } from "../db/utils/users.js";

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

      await Promise.all(
        input.users.map(async (userName) => {
          const user = await createUser(userName);
          await addUserToGroup(newGroup.id, user.id);
        })
      );

      const groupWithUsers = await getGroup(newGroup.code);

      if (groupWithUsers === undefined) {
        // TODO: refine this error
        throw Error("Problem fetching newly created group");
      }

      return groupWithUsers;
    }),

  updateName: t.procedure
    .input(z.object({ code: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const group = await getGroup(input.code);
      const updatedGroup = await updateGroupName(group.id, input.name);

      return updatedGroup[0];
    }),

  getBalances: t.procedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const group = await getGroup(input.code);
      const balances = await getUserBalances(group.id);

      return balances;
    }),
});
