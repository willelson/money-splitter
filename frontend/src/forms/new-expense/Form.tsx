import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormHeader from "@/forms/Header";
import { useCodeParam } from "@/hooks/useCodeParam";
import { useGroupStore, User } from "@/store/groupStore";
import { trpc } from "@/trpc";
import AmountInput from "./AmountInput";
import UserSelection from "./UserSelection";

type ExpenseFormState = "main" | "senderSelection" | "recipientsSelection";

function NewExpense() {
  useCodeParam();
  const { selectedGroup } = useGroupStore();
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  const [sender, setSender] = useState<User | null>(null);
  const [recipients, setRecipients] = useState<Set<number>>(
    new Set(selectedGroup?.users.map((u) => u.id)),
  );

  const [formState, setFormState] = useState<ExpenseFormState>("main");

  const selectSender = (userId: number) => {
    const user = selectedGroup?.users.find((u) => u.id === userId);
    if (user === undefined) {
      throw Error("Could not find selected user");
    }
    setFormState("main");
    setSender(user);
  };

  const selectRecipients = (userId: number) => {
    if (recipients.has(userId)) {
      setRecipients((r) => {
        const newRecipients = new Set(r);
        newRecipients.delete(userId);
        return newRecipients;
      });
    } else {
      setRecipients((r) => {
        const newRecipients = new Set(r);
        newRecipients.add(userId);
        return newRecipients;
      });
    }
  };

  const mutation = trpc.transactions.add.useMutation({
    onSuccess: () => {
      console.log("Transaction added sucessfully");
      navigate(`/group/${selectedGroup?.code}/overview`);
    },
    onError: (error) => {
      console.error("Error adding transaction:", error);
      alert("There was an error adding this transaction");
    },
  });

  // TODO: look at the position of this - code above could run with group being null
  if (selectedGroup === null) return <p>group error</p>;

  const addExpense = () => {
    const errors: string[] = [];

    if (title.length === 0) {
      errors.push("Title is required");
    }
    if (sender === null) {
      errors.push("No sender is selected");
    }
    if (recipients.size === 0) {
      errors.push("No recipeints are selected");
    }

    if (errors.length > 0) {
      const alertMessage =
        "There are problems with the form: \n\n" + errors.join("\n");
      alert(alertMessage);
      return;
    }

    const newTransaction = {
      groupId: selectedGroup.id,
      senderId: sender!.id,
      recipientIds: [...recipients],
      amount: amount,
      name: title,
      type: "expense",
    };

    mutation.mutate(newTransaction);
  };

  const senderSelection = (
    <div className={formState !== "senderSelection" ? "hidden" : ""}>
      <FormHeader backFunction={() => setFormState("main")}></FormHeader>
      <UserSelection
        users={selectedGroup.users}
        selectedUsers={sender !== null ? [sender.id] : []}
        selectUser={selectSender}
      />
    </div>
  );

  const recipientSelection = (
    <div className={formState !== "recipientsSelection" ? "hidden" : ""}>
      <FormHeader backFunction={() => setFormState("main")}></FormHeader>
      <UserSelection
        users={selectedGroup.users}
        selectedUsers={[...recipients]}
        selectUser={selectRecipients}
      />
    </div>
  );

  return (
    <>
      <div className={formState !== "main" ? "hidden" : ""}>
        <FormHeader>
          <Button variant="ghost" onClick={addExpense}>
            Add
          </Button>
        </FormHeader>
        <div className="flex-1">
          <div className="flex flex-col gap-4 rounded bg-muted p-2">
            <Input
              className="md:text-md"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-col justify-center gap-4 rounded bg-muted px-2 py-1">
            <AmountInput value={amount} onChange={setAmount} />
          </div>
          <div className="mt-4 flex flex-col gap-4 rounded bg-muted p-2">
            <div className="flex justify-between py-1">
              <p className="pl-3">From</p>
              <div
                className="flex cursor-pointer gap-2"
                onClick={() => setFormState("senderSelection")}
              >
                <span>{sender && sender.name}</span>
                <ChevronRight className="text-muted-foreground" />
              </div>
            </div>

            <div className="flex justify-between py-1">
              <p className="pl-3">For</p>
              <div
                className="flex cursor-pointer gap-2"
                onClick={() => setFormState("recipientsSelection")}
              >
                <span>
                  {recipients.size} Person{recipients.size !== 1 ? "s" : ""}{" "}
                </span>
                <ChevronRight className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {recipientSelection}
      {senderSelection}
    </>
  );
}

export default NewExpense;
