import { Menu } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client, trpc } from "./trpc";

import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";
import { useSidebarStore } from "./store";

import GroupOverview from "@/pages/GroupOverview";
import GroupTransactions from "@/pages/GroupTransactions";
import LandingPage from "@/pages/LandingPage";

import JoinGroup from "@/forms/JoinGroup";
import NewExpense from "@/forms/new-expense/Form";
import NewGroup from "@/forms/new-group/Form";
import NewTransaction from "@/forms/NewTransaction";

const queryClient = new QueryClient();

function App() {
  const { open, setOpen } = useSidebarStore();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <trpc.Provider client={client} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <div className="relative flex h-screen w-screen overflow-hidden">
            <BrowserRouter>
              <Sidebar />
              <div
                className={`relative flex-1 bg-background transition-[margin] md:min-w-[768px] ${open ? "md:ml-64" : ""} `}
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
                      <Route
                        path="/group/:code/overview"
                        element={<GroupOverview />}
                      />
                      <Route
                        path="/group/:code/transactions"
                        element={<GroupTransactions />}
                      />

                      <Route path="/join-group" element={<JoinGroup />} />
                      <Route path="/new-group" element={<NewGroup />} />
                      <Route
                        path="/group/:code/new-expense"
                        element={<NewExpense />}
                      />
                      <Route
                        path="/group/:code/new-transaction"
                        element={<NewTransaction />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </BrowserRouter>
          </div>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
}

export default App;
