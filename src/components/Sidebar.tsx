import { PanelLeftClose } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store";

function Sidebar() {
  const { open, setOpen } = useSidebarStore();
  return (
    <div
      className={`absolute h-full w-64 bg-gray-50 p-2 transition-[left] dark:bg-neutral-700 ${open ? "left-0" : "-left-64"}`}
    >
      <Button onClick={() => setOpen(false)} variant="ghost" size="icon">
        <PanelLeftClose />
      </Button>
    </div>
  );
}

export default Sidebar;
