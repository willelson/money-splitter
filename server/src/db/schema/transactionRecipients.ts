import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, numeric } from "drizzle-orm/pg-core";

import { transactions } from "./transactions.js";
import { users } from "./users.js";

export const transactionRecipients = pgTable("transaction_recipients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  transaction_id: integer()
    .notNull()
    .references(() => transactions.id, { onDelete: "cascade" }),
  recipient_id: integer()
    .notNull()
    .references(() => users.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  share: numeric({ precision: 10, scale: 2 }).notNull(),
});

export const transactionRecipientsRelations = relations(
  transactionRecipients,
  ({ one }) => ({
    recipient: one(users, {
      fields: [transactionRecipients.recipient_id],
      references: [users.id],
    }),

    transaction: one(transactions, {
      fields: [transactionRecipients.transaction_id],
      references: [transactions.id],
    }),
  })
);
