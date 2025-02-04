import { db } from "../index";
import { users } from "../schema/users";

type User = typeof users.$inferSelect;
type UserInsert = typeof users.$inferInsert;

export const createUser = async (name: string): Promise<User> => {
  const user: UserInsert = { name };

  const newUserResult = await db.insert(users).values(user).returning();
  if (newUserResult.length !== 1) throw Error("Error creating user");

  return newUserResult[0];
};
