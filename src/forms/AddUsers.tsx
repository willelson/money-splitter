import { Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AddUsers = {
  className?: string;
};

function AddUsers({ className }: AddUsers) {
  const [user, setUser] = useState<string>("");
  const [users, setUsers] = useState<Array<string>>([]);

  const addUserToUsers = () => {
    if (user.length > 0) {
      setUsers((u) => [...u, user]);
      setUser("");
    }
  };

  const enterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addUserToUsers();
    }
  };

  const removeUser = (index: number) => {
    setUsers((u) => [...u.slice(0, index), ...u.slice(index + 1)]);
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
        <Button variant="secondary" size="icon" onClick={addUserToUsers}>
          <Plus />
        </Button>
      </div>
      {users.map((user, index) => (
        <div className="flex justify-between py-2">
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
