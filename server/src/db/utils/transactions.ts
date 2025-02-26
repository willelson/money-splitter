import { and, desc, eq, sum } from "drizzle-orm";

import { db } from "../index.js";
import { transactionRecipients } from "../schema/transactionRecipients.js";
import { transactions } from "../schema/transactions.js";
import { users } from "../schema/users.js";
import { getGroup } from "./groups.js";

type Transaction = typeof transactions.$inferSelect;

export const getTransactions = async (
  groupCode: string
): Promise<Transaction[]> => {
  const group = await getGroup(groupCode);

  return await db
    .select()
    .from(transactions)
    .where(eq(transactions.group_id, group.id))
    .orderBy(desc(transactions.created_at));
};

export const insertTransaction = async (
  groupId: number,
  senderId: number,
  recipientIds: number[],
  name: string,
  amount: Transaction["amount"],
  type: string
) => {
  const newTransaction: typeof transactions.$inferInsert = {
    name,
    type,
    amount,
    group_id: groupId,
    sender_id: senderId,
  };

  const insertedTransaction = await db
    .insert(transactions)
    .values(newTransaction)
    .returning();

  const recipientShares = calculateUserShares(amount, recipientIds);

  recipientIds.forEach(async (recipientId) => {
    const newTransactionRecipients: typeof transactionRecipients.$inferInsert =
      {
        transaction_id: insertedTransaction[0].id,
        recipient_id: recipientId,
        // TODO: fix this being cast as a string
        share: recipientShares[recipientId].toString(),
      };

    await db.insert(transactionRecipients).values(newTransactionRecipients);
  });
};

export const deleteTransaction = async (
  code: string,
  transactionId: number
) => {
  // Check valid roup code was passed and use it for deletion
  const group = await getGroup(code);

  await db
    .delete(transactions)
    .where(
      and(
        eq(transactions.id, transactionId),
        eq(transactions.group_id, group.id)
      )
    );
};

type UserBalance = {
  id: number;
  name: string;
  balance: number;
};

export const getUserBalances = async (
  groupId: number
): Promise<UserBalance[]> => {
  // Get amounts paid by each sender
  const payments = await db
    .select({
      userId: users.id,
      user: users.name,
      paid: sum(transactions.amount),
    })
    .from(transactions)
    .leftJoin(users, eq(users.id, transactions.sender_id))
    .where(eq(transactions.group_id, groupId))
    .groupBy(transactions.sender_id, users.name, users.id);

  // Get amounts owed by each recipient
  const recieved = await db
    .select({
      userId: users.id,
      user: users.name,
      recieved: sum(transactionRecipients.share),
    })
    .from(transactionRecipients)
    .leftJoin(
      transactions,
      eq(transactions.id, transactionRecipients.transaction_id)
    )
    .leftJoin(users, eq(users.id, transactionRecipients.recipient_id))
    .where(eq(transactions.group_id, groupId))
    .groupBy(transactionRecipients.recipient_id, users.name, users.id);

  const groupUsers = await db
    .select({
      id: users.id,
      name: users.name,
    })
    .from(users)
    .where(eq(users.group_id, groupId));

  const userBalances: UserBalance[] = [];

  groupUsers.forEach(({ id, name }) =>
    userBalances.push({ id, name, balance: 0 })
  );

  payments.forEach(({ userId, paid }) => {
    const userBalance = userBalances.find((b) => b.id === userId);

    if (userBalance === undefined) {
      throw Error("Could not calculate user balance");
    }
    userBalance.balance += parseFloat(paid!);
  });

  recieved.forEach(({ userId, recieved }) => {
    const userBalance = userBalances.find((b) => b.id === userId);

    if (userBalance === undefined) {
      throw Error("Could not calculate user balance");
    }

    userBalance.balance -= parseFloat(recieved!);
  });

  return userBalances;
};

/**
 * Calculate the share allocated to each user. For example, if 3 users split 10.00, one must
 * pay 3.34 and two must pay 3.33.
 *
 * Returns a record of user id and share
 * eg users with ids 24, 26 & 45 splitting 10.00 returns { 24: 3.33, 26: 3.34, 45: 3.33}
 */
const calculateUserShares = (
  amount: string,
  userIds: number[]
): Record<number, number> => {
  const totalAmount = parseFloat(amount);

  const startingShare =
    Math.floor((parseFloat(amount) / userIds.length) * 100) / 100;

  const userShares: Record<number, number> = {};

  userIds.forEach((id) => (userShares[id] = startingShare));

  // claculate missing cents
  const missingCents = Math.round(
    (totalAmount - startingShare * userIds.length) / 0.01
  );

  // for each missing cent, randomly allocate an extra cent to a users share
  for (let i = 0; i < missingCents; i++) {
    const randomUserIdIndex = Math.floor(Math.random() * userIds.length);
    const userId = userIds[randomUserIdIndex];
    const newShare = Math.round((userShares[userId] + 0.01) * 100) / 100;
    userShares[userId] = newShare;
  }

  return userShares;
};
