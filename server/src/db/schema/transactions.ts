import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { groups } from "./groups";
import { transactionRecipients } from "./transactionRecipients";
import { users } from "./users";

export const transactions = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  type: varchar({ length: 255 }),
  amount: numeric({ precision: 10, scale: 2 }).notNull(),
  group_id: integer()
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
  sender_id: integer()
    .notNull()
    .references(() => users.id),
});

export const transactionsRelations = relations(
  transactions,
  ({ many, one }) => ({
    sender: one(users, {
      fields: [transactions.sender_id],
      references: [users.id],
    }),

    group: one(groups, {
      fields: [transactions.group_id],
      references: [groups.id],
    }),

    recipients: many(transactionRecipients),
  })
);
