import NavBar from "@/components/navbar/NavBar";
import Expense from "@/components/transactions/Expense";
import { Input } from "@/components/ui/input";
import { useCodeParam } from "@/hooks/useCodeParam";
import { useGroupStore } from "@/store/groupStore";
import { trpc } from "@/trpc";

function GroupTransactions() {
  const { code } = useCodeParam();
  const { selectedGroup } = useGroupStore();

  const { data: transactions, isLoading } = trpc.transactions.get.useQuery({
    code: code!,
  });

  const groupUsers: Record<number, string> = {};
  selectedGroup?.users.forEach((user) => (groupUsers[user.id] = user.name));

  return (
    <div className="flex h-full flex-col gap-4">
      <Input placeholder="search" />
      <div className="flex-1 overflow-auto">
        <ul>
          {transactions?.map((transaction) => (
            <li key={`group=${code}-transaction-${transaction.id}`}>
              <Expense
                title={transaction.name}
                amount={transaction.amount}
                by={groupUsers[transaction.sender_id]}
              />
            </li>
          ))}
        </ul>
      </div>
      <NavBar />
    </div>
  );
}

export default GroupTransactions;
