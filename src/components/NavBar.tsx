import { ChartLine, Plus, ScrollText } from "lucide-react";
import { useLocation } from "react-router";

import NavBarLink from "./NavBarLink";

function NavBar() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="flex w-full justify-between">
      <NavBarLink title="Overview" href="/overview">
        <ChartLine />
      </NavBarLink>
      <Plus />
      <NavBarLink title="Transactions" href="/transactions">
        <ScrollText />
      </NavBarLink>
    </div>
  );
}

export default NavBar;
