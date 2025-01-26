import { ChevronRight, PanelLeftClose } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store";
import ThemeToggle from "@/ThemeSwitcher";

function Sidebar() {
  const { open, setOpen } = useSidebarStore();
  return (
    <div
      className={`absolute h-full w-64 bg-muted p-2 transition-[left] ${open ? "left-0" : "-left-64"}`}
    >
      <div className="mb-10 flex justify-between">
        <Button onClick={() => setOpen(false)} variant="ghost" size="icon">
          <PanelLeftClose />
        </Button>
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-4 rounded bg-primary-foreground p-3">
        <p className="text-sm text-muted-foreground">GROUPS</p>
        <div className="hover:cursor-pointer">
          <p className="text-accent-foreground">Cracker</p>
          <p className="text-xs text-muted-foreground">2 Persons</p>
        </div>
        <div className="hover:cursor-pointer">
          <p>Vienna trip</p>
          <p className="text-xs text-muted-foreground">4 Persons</p>
        </div>
      </div>

      <div className="mt-10 px-2">
        <div className="flex justify-between py-2 text-muted-foreground">
          About
          <ChevronRight />
        </div>
        <div className="flex justify-between py-2 text-muted-foreground">
          Settings
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
