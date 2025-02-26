import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import NavBar from "@/components/navbar/NavBar";
import Expense from "@/components/transactions/Expense";
import TransactionSkeleton from "@/components/transactions/TransactionSkeleton";
import { Input } from "@/components/ui/input";
import { useCodeParam } from "@/hooks/useCodeParam";
import { useGroupStore } from "@/store/groupStore";
import { trpc } from "@/trpc";

function GroupTransactions() {
  const { code } = useCodeParam();
  const { selectedGroup } = useGroupStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const { data: transactions, isLoading } = trpc.transactions.get.useQuery({
    code: code!,
  });

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };

  const filteredTransactions =
    transactions?.filter((t) => {
      if (searchQuery === "") return true;
      else return t.name.toLowerCase().includes(searchQuery.toLowerCase());
    }) || [];

  const groupUsers: Record<number, string> = {};
  selectedGroup?.users.forEach((user) => (groupUsers[user.id] = user.name));

  const transactionList = (
    <div className="flex-1 overflow-auto">
      {transactions?.length === 0 ? (
        <p className="text-light mt-4 text-center text-sm text-muted-foreground">
          No transactions yet...
        </p>
      ) : (
        <ul>
          {filteredTransactions?.map((transaction) => (
            <li key={`group-${code}-transaction-${transaction.id}`}>
              <Expense
                title={transaction.name}
                amount={transaction.amount}
                by={groupUsers[transaction.sender_id]}
                transactionId={transaction.id}
                groupCode={selectedGroup?.code!}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <Input
        placeholder="Search transactions..."
        value={searchQuery}
        onChange={onSearchInput}
        type="search"
      />
      {isLoading ? <TransactionSkeleton /> : transactionList}
      <NavBar />
    </div>
  );
}

export default GroupTransactions;
