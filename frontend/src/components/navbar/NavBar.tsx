import { ChartLine, ScrollText } from "lucide-react";
import { useParams } from "react-router-dom";

import AddButton from "./AddButton";
import NavBarLink from "./NavBarLink";

function NavBar() {
  const { code } = useParams();

  return (
    <div className="flex w-full justify-between pt-2">
      <NavBarLink
        title="Overview"
        href={`/group/${code}/overview`}
        selector="overview"
      >
        {({ className }) => <ChartLine className={className} />}
      </NavBarLink>
      <AddButton />
      <NavBarLink
        title="Transactions"
        href={`/group/${code}/transactions`}
        selector="transactions"
      >
        {({ className }) => <ScrollText className={className} />}
      </NavBarLink>
    </div>
  );
}

export default NavBar;
