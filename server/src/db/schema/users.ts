import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

import { groups } from "./groups";
import { transactionRecipients } from "./transactionRecipients";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  // flag for when user is removed fom a group and their transactions shuold remain
  active: boolean().notNull().default(true),
  group_id: integer().references(() => groups.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  group: one(groups, {
    fields: [users.group_id],
    references: [groups.id],
  }),
  sent_transactions: many(transactionRecipients),
}));
