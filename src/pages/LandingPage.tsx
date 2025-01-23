import ThemeToggle from "@/ThemeSwitcher";

function LandingPage() {
  return (
    <>
      <h1 className="text-foreground text-3xl font-light underline">
        Hello world!
      </h1>
      <ThemeToggle />
    </>
  );
}

export default LandingPage;
