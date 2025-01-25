import { Menu } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";
import { useSidebarStore } from "./store";

import GroupOverview from "@/pages/GroupOverview";
import GroupTransactions from "@/pages/GroupTransactions";
import LandingPage from "@/pages/LandingPage";

import JoinGroup from "@/forms/JoinGroup";
import NewExpense from "@/forms/NewExpense";
import NewGroup from "@/forms/NewGroup";
import NewTransaction from "@/forms/NewTransaction";

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
            <div className="flex h-full items-center justify-center">
              <div className="h-[70vh] w-[350px]">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/overview" element={<GroupOverview />} />
                  <Route path="/transactions" element={<GroupTransactions />} />

                  <Route path="/join-group" element={<JoinGroup />} />
                  <Route path="/new-group" element={<NewGroup />} />
                  <Route path="/new-expense" element={<NewExpense />} />
                  <Route path="/new-transaction" element={<NewTransaction />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
