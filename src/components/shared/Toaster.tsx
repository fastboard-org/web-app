"use client";

import { poppins } from "@/app/layout";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={`${poppins.className}`}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          success: "bg-success-100 text-success-600",
          warning: "bg-warning-100 text-warning-600",
          error: "bg-danger-100 text-danger-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
