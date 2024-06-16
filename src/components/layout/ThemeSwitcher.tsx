"use client";
import { Button } from "@nextui-org/react";
import { Sun1, Moon } from "iconsax-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ThemeSwitcherProps = {
  size: "sm" | "md" | "lg" | undefined;
};

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { size } = props;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
            <Button
              size={size}
              isIconOnly
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={"bg-foreground bg-opacity-5"}
            >
              {theme === "dark" ? (
                <Sun1 size="24" variant="Bold" className={"text-primary"} />
              ) : (
                <Moon size="24" variant="Bold" className={"text-primary"} />
              )}
            </Button>
          </motion.div>
        )}
    </AnimatePresence>
  );
}
