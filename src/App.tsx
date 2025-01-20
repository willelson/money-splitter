import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/ThemeSwitcher";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="bg-background">
        <h1 className="text-foreground text-3xl font-bold underline">
          Hello world!
        </h1>
        <Button>Click me</Button>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
