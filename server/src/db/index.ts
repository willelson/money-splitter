import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import * as groupsSchema from "./schema/groups.js";
import * as transactionRecipientsSchema from "./schema/transactionRecipients.js";
import * as transactionsSchema from "./schema/transactions.js";
import * as usersSchema from "./schema/users.js";

const dbHost = process.env.POSTGRES_HOST || "localhost";
const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@${dbHost}:5432/postgres`;

export const db = drizzle(DATABASE_URL, {
  schema: {
    ...groupsSchema,
    ...usersSchema,
    ...transactionsSchema,
    ...transactionRecipientsSchema,
  },
});
