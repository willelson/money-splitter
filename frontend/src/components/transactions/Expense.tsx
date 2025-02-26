import { ShoppingBasket, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";

import { trpc } from "@/trpc";

type Expense = {
  title: string;
  amount: string;
  by: string;
  groupCode: string;
  transactionId: number;
};

function Expense({ title, amount, by, groupCode, transactionId }: Expense) {
  const [open, setOpen] = useState(false);

  const toggleTransaction = () => {
    setOpen(!open);
    setTimeout(() => setOpen(false), 3000);
  };

  const utils = trpc.useUtils();

  const mutation = trpc.transactions.delete.useMutation({
    onSuccess: () => {
      utils.transactions.get.invalidate();
    },
    onError: () => {
      alert("Unablbe to delete this transaction.");
    },
  });

  return (
    <div className="relative flex border-b px-1 py-2">
      <div
        className={`z-10 flex w-full cursor-pointer justify-between bg-background transition-transform ${open ? "-translate-x-10" : ""}`}
        onClick={toggleTransaction}
      >
        <div className="flex items-center gap-5">
          <ShoppingBasket className="flex-shrink-0 text-accent-foreground" />
          <div>
            <p className="line-clamp-2 pr-2">{title}</p>
            <p className="text-muted-foreground">{by}</p>
          </div>
        </div>
        <p className="mr-2">
          {parseFloat(amount).toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
      </div>
      <div className="absolute right-1 z-0">
        <Button
          className="z-0"
          variant="destructive"
          size="icon"
          onClick={() => mutation.mutate({ groupCode, transactionId })}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

export default Expense;
