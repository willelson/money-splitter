import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { transactions } from "./transactions";
import { users } from "./users";

export const groups = pgTable("groups", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  code: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  users: many(users),
  transactions: many(transactions),
}));
