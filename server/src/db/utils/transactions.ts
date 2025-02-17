import { eq, sum } from "drizzle-orm";

import { db } from "../index";
import { transactionRecipients } from "../schema/transactionRecipients";
import { transactions } from "../schema/transactions";
import { users } from "../schema/users";
import { getGroup } from "./groups";

type Transaction = typeof transactions.$inferSelect;

export const getTransactions = async (
  groupCode: string
): Promise<Transaction[]> => {
  const group = await getGroup(groupCode);

  return await db.query.transactions.findMany({
    where: eq(transactions.group_id, group.id),
  });
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

  const recipientShare = parseFloat(amount) / recipientIds.length;

  recipientIds.forEach(async (recipientId) => {
    const newTransactionRecipients: typeof transactionRecipients.$inferInsert =
      {
        transaction_id: insertedTransaction[0].id,
        recipient_id: recipientId,
        // TODO: fix this being cast as a string
        share: recipientShare.toString(),
      };

    await db.insert(transactionRecipients).values(newTransactionRecipients);
  });
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
