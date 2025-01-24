import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

function AddButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Plus width={36} height={36} className="hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-2">New Transaction</DropdownMenuItem>
          <DropdownMenuItem className="py-2">New Person</DropdownMenuItem>
          <DropdownMenuItem className="py-2">New Expense</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddButton;
