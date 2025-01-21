import { Button } from "./components/ui/button";
import { useSidebarStore } from "./store";

function Sidebar() {
  const { open, setOpen } = useSidebarStore();
  return (
    <div
      className={`absolute h-full w-64 bg-gray-50 dark:bg-neutral-700 ${open ? "left-0" : "-left-64"} transition-[left]`}
    >
      <Button onClick={() => setOpen(false)}>toggle</Button>
    </div>
  );
}

export default Sidebar;
