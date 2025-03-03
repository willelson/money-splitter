import { TRPCError } from "@trpc/server";
import { eq, inArray } from "drizzle-orm";

import { db } from "../index.js";
import { groups } from "../schema/groups.js";
import { users } from "../schema/users.js";

type Group = typeof groups.$inferSelect & {
  users: (typeof users.$inferSelect)[];
};

type GroupInsert = typeof groups.$inferInsert;

export const getGroup = async (code: string): Promise<Group> => {
  const group = await db.query.groups.findFirst({
    where: eq(groups.code, code),
    with: { users: true },
  });

  if (group === undefined) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Group not found",
    });
  }

  return group;
};

export const getGroups = async (codes: string[]): Promise<Group[]> => {
  try {
    return await db.query.groups.findMany({
      where: inArray(groups.code, codes),
      with: {
        users: true,
      },
    });
  } catch (e) {
    console.log("error", e);
    throw Error("Database error");
  }
};

export const createGroup = async (
  name: string,
  code: string = ""
): Promise<typeof groups.$inferSelect> => {
  if (!code) {
    code = Math.random().toString(36).slice(2, 14);
  }
  const group: GroupInsert = { name, code };

  const newGroupResult = await db.insert(groups).values(group).returning();
  if (newGroupResult.length !== 1) throw Error("Error creating group");
  return newGroupResult[0];
};

export const addUserToGroup = async (groupId: number, userId: number) => {
  await db.update(users).set({ group_id: groupId }).where(eq(users.id, userId));
};

export const updateGroupName = async (groupId: number, newName: string) =>
  await db
    .update(groups)
    .set({ name: newName })
    .where(eq(groups.id, groupId))
    .returning({ id: groups.id, name: groups.name, code: groups.code });
