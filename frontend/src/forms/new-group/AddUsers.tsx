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
      <label className="mb-2">Add Users</label>
      <div className="flex">
        <Input
          className="mr-2"
          placeholder="Enter a User name"
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
      {users.map((user, index) => (
        <div className="mt-3 flex justify-between py-2">
          <p>{user}</p>
          <Button variant="ghost" size="icon" onClick={() => removeUser(index)}>
            <X />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default AddUsers;
