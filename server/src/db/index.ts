import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import * as groupsSchema from "./schema/groups";
import * as transactionRecipientsSchema from "./schema/transactionRecipients";
import * as transactionsSchema from "./schema/transactions";
import * as usersSchema from "./schema/users";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    ...groupsSchema,
    ...usersSchema,
    ...transactionsSchema,
    ...transactionRecipientsSchema,
  },
});
