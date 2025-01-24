import { ChartLine, Plus, ScrollText } from "lucide-react";

import NavBarLink from "./NavBarLink";

function NavBar() {
  return (
    <div className="flex w-full justify-between">
      <NavBarLink title="Overview" href="/overview">
        {({ className }) => <ChartLine className={className} />}
      </NavBarLink>
      <Plus />
      <NavBarLink title="Transactions" href="/transactions">
        {({ className }) => <ScrollText className={className} />}
      </NavBarLink>
    </div>
  );
}

export default NavBar;
