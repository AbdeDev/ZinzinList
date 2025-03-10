import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
};

export default ThemeToggle;
