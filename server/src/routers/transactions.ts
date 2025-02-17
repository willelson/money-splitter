import { z } from "zod";
import { t } from "../trpc";

import { getTransactions } from "../db/utils/transactions";

export const transactionRouter = t.router({
  get: t.procedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const transactions = await getTransactions(input.code);

      return transactions;
    }),
});
