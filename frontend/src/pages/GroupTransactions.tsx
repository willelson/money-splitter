import NavBar from "@/components/navbar/NavBar";
import Expense from "@/components/transactions/Expense";
import Transaction from "@/components/transactions/Transaction";
import { Input } from "@/components/ui/input";
import { useCodeParam } from "@/hooks/useCodeParam";

function GroupTransactions() {
  useCodeParam();

  return (
    <div className="flex h-full flex-col gap-4">
      <Input placeholder="search" />
      <div className="flex-1 overflow-auto">
        <ul>
          <li>
            <Expense />
          </li>
          <li>
            <Transaction />
          </li>
          <li>
            <Expense />
          </li>
          <li>
            <Expense />
          </li>
          <li>
            <Transaction />
          </li>
          <li>
            <Expense />
          </li>
          <li>
            <Transaction />
          </li>
          <li>
            <Transaction />
          </li>
          <li>
            <Expense />
          </li>
          <li>
            <Expense />
          </li>
        </ul>
      </div>
      <NavBar />
    </div>
  );
}

export default GroupTransactions;
