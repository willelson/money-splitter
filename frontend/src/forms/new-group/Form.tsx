import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormHeader from "@/forms/Header";
import AddUsers from "@/forms/new-group/AddUsers";
import { saveGroupCodeLocally } from "@/store/utils/groups";
import { client } from "@/trpc";

function NewGroup() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  const addUser = (user: string) => setUsers((u) => [...u, user]);
  const removeUser = (index: number) =>
    setUsers((u) => [...u.slice(0, index), ...u.slice(index + 1)]);

  const createGroup = async () => {
    const newGroup = await client.groups.create.mutate({
      name,
      users,
    });

    saveGroupCodeLocally(newGroup.code);
  };

  return (
    <div className="h-full">
      <FormHeader>
        <Button
          variant="ghost"
          onClick={createGroup}
          disabled={name.length === 0}
        >
          Create
        </Button>
      </FormHeader>
      <label className="mb-2">Group name</label>
      <div>
        <Input
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <AddUsers
        className="mt-4"
        users={users}
        addUser={addUser}
        removeUser={removeUser}
      />
    </div>
  );
}

export default NewGroup;
