import { Check, EllipsisVertical, Pencil, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { trpc } from "@/trpc";

type GroupName = {
  name: string;
  groupCode: string;
};

function GroupName({ name, groupCode }: GroupName) {
  const [editing, setEditing] = useState<boolean>(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const [updatedName, setUpdatedName] = useState(name);

  const utils = trpc.useUtils();

  const mutation = trpc.groups.updateName.useMutation({
    onSuccess: () => {
      setEditing(false);
      utils.groups.getMany.invalidate();
    },
    onError: () => {
      alert("Error updating name");
      setUpdatedName(name);
    },
  });

  const updateName = () =>
    mutation.mutate({ name: updatedName, code: groupCode });

  const cancelEditing = () => {
    setUpdatedName(name);
    setEditing(false);
  };

  const enterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateName();
    }
  };

  return (
    <div>
      <div
        className={`flex min-h-[36px] w-full items-center gap-2 ${editing ? "hidden" : ""}`}
      >
        <h1 className="flex-1 text-lg">{name}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <EllipsisVertical className="text-foreground-muted cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-1 w-40" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="py-3 hover:cursor-pointer"
                onClick={() => {
                  setEditing(true);
                  if (nameInput.current) nameInput.current.focus();
                }}
              >
                <div className="flex w-full items-center gap-3">
                  <Pencil height={18} width={18} />
                  <p>Edit name</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={`flex gap-2 ${editing ? "" : "hidden"}`}>
        <Input
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          onKeyDown={enterPressed}
          ref={nameInput}
          className="md:text-md flex-1"
        />
        <div className="flex">
          <Button size="icon" variant="ghost" onClick={updateName}>
            <Check />
          </Button>
          <Button size="icon" variant="ghost" onClick={cancelEditing}>
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GroupName;
