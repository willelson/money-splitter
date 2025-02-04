import { eq } from "drizzle-orm";

import { db } from "../index";
import { groups } from "../schema/groups";
import { users } from "../schema/users";

type Group = typeof groups.$inferSelect;
type GroupInsert = typeof groups.$inferInsert;

export const getGroup = async (code: string): Promise<Group> => {
  let group = await db.query.groups.findFirst({
    where: eq(groups.code, code),
    with: { users: true, transactions: true },
  });

  if (group === undefined) {
    throw Error(`Group with name "${code}" not found`);
  }

  return group;
};

export const createGroup = async (
  name: string,
  code: string = ""
): Promise<Group> => {
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
