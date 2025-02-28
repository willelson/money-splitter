import { PanelLeftClose } from "lucide-react";
import { useEffect } from "react";
import { trpc } from "../trpc";

import Groups from "@/components/sidebar/Groups";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store";
import ThemeToggle from "@/ThemeSwitcher";

import { useGroupStore } from "@/store/groupStore";
import { loadLocalGroupCodes } from "@/store/utils/groups";

function Sidebar() {
  const { open, setOpen } = useSidebarStore();
  const { setGroups, setLoadingGroups, setSelectedGroup, selectedGroup } =
    useGroupStore();

  const savedGroupCodes = loadLocalGroupCodes();

  const { isLoading } = trpc.groups.getMany.useQuery(
    {
      codes: savedGroupCodes,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (fetchedGroups) => {
        setGroups(fetchedGroups);

        // Re-set selected group from fetchedGroups
        if (selectedGroup !== null) {
          setSelectedGroup(selectedGroup.id);
        }
      },
    },
  );
  useEffect(() => setLoadingGroups(isLoading), [isLoading]);

  return (
    <div
      className={`absolute z-50 flex h-full w-64 flex-col bg-muted p-2 transition-[left] ${open ? "left-0" : "-left-64"}`}
    >
      <div className="mb-10 flex justify-between">
        <Button onClick={() => setOpen(false)} variant="ghost" size="icon">
          <PanelLeftClose />
        </Button>
        <ThemeToggle />
      </div>

      <Groups />

      <div className="mt-10 flex flex-1 flex-col justify-end px-2">
        <p className="pb-2 text-center text-sm text-muted-foreground">
          A project by <a href="https://github.com/willelson">willelson</a>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
