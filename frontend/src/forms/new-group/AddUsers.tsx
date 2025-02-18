import { Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AddUsers = {
  className?: string;
  users: string[];
  addUser: (user: string) => void;
  removeUser: (index: number) => void;
};

function AddUsers({ className, users, addUser, removeUser }: AddUsers) {
  const [user, setUser] = useState<string>("");

  const addUserToUsers = () => {
    if (user.length > 0) {
      addUser(user);
      setUser("");
    }
  };

  const enterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addUserToUsers();
    }
  };

  return (
    <div className={className}>
      <p className="mb-2 text-sm uppercase text-muted-foreground">Users</p>
      <div className="flex flex-col rounded bg-muted p-2">
        <div className={`flex ${users.length > 0 ? "mb-3" : ""}`}>
          <Input
            className="md:text-md mr-2"
            placeholder="User name..."
            onKeyDown={enterPressed}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Button
            className="min-w-[36px]"
            variant="secondary"
            size="icon"
            onClick={addUserToUsers}
            disabled={user.length === 0}
          >
            <Plus />
          </Button>
        </div>
        <ul className="pl-3">
          {users.map((user, index) => (
            <li
              className="flex items-center justify-between"
              key={`new-user-${index}`}
            >
              <p>{user}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeUser(index)}
              >
                <X />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddUsers;
