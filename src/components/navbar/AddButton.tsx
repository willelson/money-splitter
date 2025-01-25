import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Plus, ShoppingBasket, User } from "lucide-react";

function AddButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Plus width={36} height={36} className="hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-70">
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-3">
            <div className="flex items-center gap-3 hover:cursor-pointer">
              <ShoppingBasket className="text-accent-foreground" />
              <div>
                <p>New Expense</p>
                <p className="text-muted-foreground">
                  Add a new purchase within the group
                </p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3">
            <div className="flex items-center gap-3 hover:cursor-pointer">
              <ArrowRight className="text-accent-foreground" />

              <div>
                <p>New Transaction</p>
                <p className="text-muted-foreground">
                  Add a payment within the group
                </p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3">
            <div className="flex items-center gap-3 hover:cursor-pointer">
              <User className="text-accent-foreground" />
              <div>
                <p>New Person</p>
                <p className="text-muted-foreground">
                  Add a new person to the group
                </p>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddButton;
