import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddUsers from "@/forms/AddUsers";
import FormHeader from "@/forms/Header";

function NewGroup() {
  const [name, setName] = useState("");
  return (
    <div className="h-full">
      <FormHeader>
        <Button variant="ghost" onClick={() => {}} disabled={name.length === 0}>
          Next
        </Button>
      </FormHeader>
      <label className="mb-2">Group name</label>
      <Input
        placeholder="Group name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <AddUsers className="mt-4" />
    </div>
  );
}

export default NewGroup;
