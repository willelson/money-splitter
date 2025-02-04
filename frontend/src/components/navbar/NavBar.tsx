import { ChartLine, ScrollText } from "lucide-react";

import AddButton from "./AddButton";
import NavBarLink from "./NavBarLink";

function NavBar() {
  return (
    <div className="flex w-full justify-between pt-2">
      <NavBarLink title="Overview" href="/overview">
        {({ className }) => <ChartLine className={className} />}
      </NavBarLink>
      <AddButton />
      <NavBarLink title="Transactions" href="/transactions">
        {({ className }) => <ScrollText className={className} />}
      </NavBarLink>
    </div>
  );
}

export default NavBar;
