import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormHeader from "@/forms/Header";
import AddUsers from "@/forms/new-group/AddUsers";
import { useGroupStore } from "@/store/groupStore";
import { saveGroupCodeLocally } from "@/store/utils/groups";
import { trpc } from "@/trpc";
import { useNavigate } from "react-router-dom";

function NewGroup() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  const { addGroup, setSelectedGroup } = useGroupStore();
  const navigate = useNavigate();

  const addUser = (user: string) => setUsers((u) => [...u, user]);
  const removeUser = (index: number) =>
    setUsers((u) => [...u.slice(0, index), ...u.slice(index + 1)]);

  const mutation = trpc.groups.create.useMutation({
    onSuccess: (newGroup) => {
      // add newGroup to zustand store and select it
      addGroup(newGroup);
      setSelectedGroup(newGroup.id);

      saveGroupCodeLocally(newGroup.code);

      // navigate to group overview
      navigate(`/group/${newGroup.code}/overview`);
    },
    onError: (error) => {
      console.error("Error creating group:", error);
    },
  });

  const createGroup = () => {
    mutation.mutate({ name, users });
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
