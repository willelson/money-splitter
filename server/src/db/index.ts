import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import * as groupsSchema from "./schema/groups.js";
import * as transactionRecipientsSchema from "./schema/transactionRecipients.js";
import * as transactionsSchema from "./schema/transactions.js";
import * as usersSchema from "./schema/users.js";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    ...groupsSchema,
    ...usersSchema,
    ...transactionsSchema,
    ...transactionRecipientsSchema,
  },
});
