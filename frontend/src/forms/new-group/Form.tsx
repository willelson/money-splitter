import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormHeader from "@/forms/Header";
import AddUsers from "@/forms/new-group/AddUsers";
import { useGroupStore } from "@/store/groupStore";
import { saveGroupCodeLocally } from "@/store/utils/groups";
import { trpc } from "@/trpc";

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
    const errors: string[] = [];
    if (name.length === 0) {
      errors.push("Group name is required");
    }
    if (users.length === 0) {
      errors.push("At least 1 user is required");
    }

    if (errors.length > 0) {
      const alertMessage =
        "There are problems with the form: \n\n" + errors.join("\n");
      alert(alertMessage);
      return;
    }

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
      <div className="flex flex-col gap-4 rounded bg-muted p-2">
        <Input
          className="md:text-md"
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
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
