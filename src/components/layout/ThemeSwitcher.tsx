"use client";
import { Button, semanticColors } from "@nextui-org/react";
import { Sun1, Moon } from "iconsax-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeSwitcher({
  size,
  // @ts-ignore
  color = semanticColors.light.focus.DEFAULT,
}: {
  size: "sm" | "md" | "lg" | undefined;
  color?: string;
}) {
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
              <Sun1
                size="20"
                variant="Bold"
                style={{
                  color: color,
                }}
              />
            ) : (
              <Moon
                size="20"
                variant="Bold"
                style={{
                  color: color,
                }}
              />
            )}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
