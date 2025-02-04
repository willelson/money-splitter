import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormHeader from "@/forms/Header";

function JoinGroup() {
  const [groupCode, setGroupCode] = useState("");
  return (
    <div className="h-full">
      <FormHeader>
        <Button
          variant="ghost"
          onClick={() => console.log("join group")}
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
