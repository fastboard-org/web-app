"use client";
import { Button } from "@nextui-org/react";
import { Sun1, Moon } from "iconsax-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-end mr-5 mt-5">
      <Button
        isIconOnly
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "dark" ? (
          <Sun1 size="24" variant="Bold" />
        ) : (
          <Moon size="24" variant="Bold" />
        )}
      </Button>
    </div>
  );
}
