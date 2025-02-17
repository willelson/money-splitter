import { ShoppingBasket } from "lucide-react";

type Expense = {
  title: string;
  amount: string;
  by: string;
};

function Expense({ title, amount, by }: Expense) {
  return (
    <div className="border-b px-1 py-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBasket className="text-accent-foreground" />
          <div>
            <p>{title}</p>
            <p className="text-muted-foreground">{by}</p>
          </div>
        </div>
        <p>
          {parseFloat(amount).toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
      </div>
    </div>
  );
}

export default Expense;
