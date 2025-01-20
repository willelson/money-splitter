import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const localStorageTheme = localStorage.getItem("theme") as
      | Theme
      | undefined;

    if (localStorageTheme) {
      setTheme(localStorageTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    }
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const buttonText = theme === "dark" ? "light mode" : "dark mode";
  return <Button onClick={toggleTheme}>{buttonText}</Button>;
};

export default ThemeToggle;
