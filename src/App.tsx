import { useState } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/Sidebar";
import ThemeToggle from "@/ThemeSwitcher";
import { Button } from "./components/ui/button";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const setSidebarState = (state: boolean) => {
    setSidebarOpen(state);
  };
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="relative flex h-screen w-screen overflow-hidden">
        <Sidebar open={sidebarOpen} setOpen={setSidebarState} />
        <div
          className={`bg-background flex-1 ${sidebarOpen ? "ml-64" : ""} min-w-[768px] transition-[margin]`}
        >
          <h1 className="text-foreground text-3xl font-light underline">
            Hello world!
          </h1>
          <ThemeToggle />
          <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "close" : "open"} sidebar
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
