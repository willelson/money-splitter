import { useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCodeParam } from "@/hooks/useCodeParam";
import { ArrowRight, Plus, ShoppingBasket, User } from "lucide-react";

function AddButton() {
  const navigate = useNavigate();
  const { code } = useCodeParam();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Plus width={36} height={36} className="hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-70">
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-3">
            <div
              className="flex items-center gap-3 hover:cursor-pointer"
              onClick={() => navigate(`/group/${code}/new-expense`)}
            >
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
            <div
              className="flex items-center gap-3 hover:cursor-pointer"
              onClick={() => navigate("/new-transaction")}
            >
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
