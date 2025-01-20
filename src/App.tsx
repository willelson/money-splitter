import { Button } from "@/components/ui/button";
import ThemeToggle from "@/ThemeSwitcher";

function App() {
  return (
    <div className="bg-background">
      <h1 className="text-foreground text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button>Click me</Button>
      <ThemeToggle />
    </div>
  );
}

export default App;
