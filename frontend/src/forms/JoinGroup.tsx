import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormHeader from "@/forms/Header";

import { useGroupStore } from "@/store/groupStore";
import { saveGroupCodeLocally } from "@/store/utils/groups";

import { trpc } from "@/trpc";
import { TRPCClientError } from "@trpc/client";

function JoinGroup() {
  const [groupCode, setGroupCode] = useState("");
  const utils = trpc.useUtils();
  const { addGroup, setSelectedGroup } = useGroupStore();
  const navigate = useNavigate();

  const joinGroup = async () => {
    try {
      // TODO: check group code does not already exist in local storage

      const group = await utils.groups.get.fetch({ code: groupCode });

      // add newGroup to zustand store and select it
      addGroup(group);
      setSelectedGroup(group.id);

      saveGroupCodeLocally(group.code);

      // navigate to group overview
      navigate(`/group/${group.code}/overview`);
    } catch (error) {
      if (error instanceof TRPCClientError && error.data.httpStatus === 404) {
        alert("Group not found.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="h-full">
      <FormHeader>
        <Button
          variant="ghost"
          onClick={joinGroup}
          disabled={groupCode.length === 0}
          className="text-accent-foreground"
        >
          Join
        </Button>
      </FormHeader>
      <Input
        placeholder="Enter group code"
        value={groupCode}
        onChange={(e) => setGroupCode(e.target.value)}
      />
    </div>
  );
}

export default JoinGroup;
