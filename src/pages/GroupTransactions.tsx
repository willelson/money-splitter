import NavBar from "@/components/navbar/NavBar";
import Expense from "@/components/transactions/Expense";
import Transaction from "@/components/transactions/Transaction";

function GroupTransactions() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-[60vh] w-[350px] flex-col gap-4">
        GroupTransactions
        <div className="flex-1">
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
          </ul>
        </div>
        <NavBar />
      </div>
    </div>
  );
}

export default GroupTransactions;
