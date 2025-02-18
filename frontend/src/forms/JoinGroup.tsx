import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormHeader from "@/forms/Header";

// import { client } from "@/trpc";

function JoinGroup() {
  const [groupCode, setGroupCode] = useState("");

  const joinGroup = async () => {
    console.log("join Group");
    // const group = await client.groups.get.query({ code: groupCode });
    // console.log(group);
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
