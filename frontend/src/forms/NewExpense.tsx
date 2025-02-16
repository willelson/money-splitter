import { ChevronRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import FormHeader from "@/forms/Header";
import { useCodeParam } from "@/hooks/useCodeParam";
import { useGroupStore } from "@/store/groupStore";

function NewExpense() {
  const { selectedGroup } = useGroupStore();
  useCodeParam();

  if (selectedGroup === null) return <p>group error</p>;

  return (
    <div>
      <FormHeader></FormHeader>
      <div className="flex-1">
        <div className="flex flex-col gap-4 rounded bg-muted p-2">
          <Input placeholder="Title" />
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded bg-muted p-2">
          <div className="flex justify-between py-1">
            <p>Amount</p>
            <p>€36.43</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 rounded bg-muted p-2">
          <div className="flex justify-between py-1">
            <p>From</p>
            <ChevronRight />
          </div>

          <div className="flex justify-between py-1">
            <p>For</p>
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewExpense;
