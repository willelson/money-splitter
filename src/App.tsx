import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/Sidebar";
import ThemeToggle from "@/ThemeSwitcher";
import { Button } from "./components/ui/button";
import { useSidebarStore } from "./store";

function App() {
  const { open, setOpen } = useSidebarStore();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="relative flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <div
          className={`bg-background flex-1 ${open ? "ml-64" : ""} min-w-[768px] transition-[margin]`}
        >
          <h1 className="text-foreground text-3xl font-light underline">
            Hello world!
          </h1>
          <ThemeToggle />
          <Button onClick={() => setOpen(!open)}>
            {open ? "close" : "open"} sidebar
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
