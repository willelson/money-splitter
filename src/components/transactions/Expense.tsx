import { ShoppingBasket } from "lucide-react";

function Expense() {
  return (
    <div className="border-b px-1 py-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBasket className="text-accent-foreground" />
          <div>
            <p>expense title</p>
            <p className="text-muted-foreground">user name</p>
          </div>
        </div>
        <p>€14,49</p>
      </div>
    </div>
  );
}

export default Expense;
