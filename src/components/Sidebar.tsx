import { PanelLeftClose } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store";
import ThemeToggle from "@/ThemeSwitcher";

function Sidebar() {
  const { open, setOpen } = useSidebarStore();
  return (
    <div
      className={`bg-muted absolute h-full w-64 p-2 transition-[left] ${open ? "left-0" : "-left-64"}`}
    >
      <div className="flex justify-between">
        <Button onClick={() => setOpen(false)} variant="ghost" size="icon">
          <PanelLeftClose />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Sidebar;
