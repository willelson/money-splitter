import { z } from "zod";
import { t } from "../trpc.js";

import {
  deleteTransaction,
  getTransactions,
  insertTransaction,
} from "../db/utils/transactions.js";

export const transactionRouter = t.router({
  get: t.procedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input }) => {
      const transactions = await getTransactions(input.code);

      return transactions;
    }),
  add: t.procedure
    .input(
      z.object({
        groupId: z.number(),
        senderId: z.number(),
        recipientIds: z.array(z.number()),
        amount: z.number(),
        name: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await insertTransaction(
        input.groupId,
        input.senderId,
        input.recipientIds,
        input.name,
        String(input.amount),
        input.type
      );
    }),

  delete: t.procedure
    .input(
      z.object({
        groupCode: z.string(),
        transactionId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await deleteTransaction(input.groupCode, input.transactionId);
    }),
});
