import { Menu } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/Sidebar";
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
            className={`bg-background flex-1 ${open ? "ml-64" : ""} min-w-[768px] transition-[margin]`}
          >
            <div className="h-10">
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
              <Route path="/overview" element={<GroupTransactions />} />
              <Route path="/transactions" element={<GroupOverview />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
