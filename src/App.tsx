import { Menu } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";
import { useSidebarStore } from "./store";

import GroupOverview from "./pages/GroupOverview";
import GroupTransactions from "./pages/GroupTransactions";
import LandingPage from "./pages/LandingPage";

function App() {
  const { open, setOpen } = useSidebarStore();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="relative flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <BrowserRouter>
          <div
            className={`bg-background relative min-w-[768px] flex-1 transition-[margin] ${open ? "ml-64" : ""} `}
          >
            <div className="absolute h-10 pl-2 pt-2">
              {open == false && (
                <Button
                  onClick={() => setOpen(true)}
                  variant="ghost"
                  size="icon"
                >
                  <Menu />
                </Button>
              )}
            </div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/overview" element={<GroupOverview />} />
              <Route path="/transactions" element={<GroupTransactions />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
