import { useState } from "react";

import { Input } from "@/components/ui/input";

type AmountInput = {
  value: number;
  onChange: (value: number) => void;
};

function AmountInput({ value, onChange }: AmountInput) {
  const [amount, setAmount] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(true);

  const valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    const newAmount = parseFloat(e.target.value);
    onChange(newAmount);
  };

  return (
    <div
      className="flex h-[44px] cursor-pointer items-center justify-between py-1 pr-2"
      onClick={() => setShowInput(true)}
    >
      <p className="pl-3">Amount</p>
      {showInput ? (
        <Input
          type="number"
          value={amount}
          className="w-[40%] appearance-none text-right [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          onChange={valueChange}
          onBlur={() => setShowInput(false)}
          onFocus={() => setShowInput(true)}
          autoFocus
        />
      ) : (
        <p>
          {amount.length > 0 &&
            parseFloat(amount).toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
        </p>
      )}
    </div>
  );
}

export default AmountInput;
