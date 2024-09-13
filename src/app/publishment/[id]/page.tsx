"use client";
import EditorModal from "@/components/editor/EditorModal";
import Viewport from "@/components/shared/Viewport";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Dashboard() {
  const { setTheme } = useTheme();
  const { dashboard } = useDashboard("published");

  useEffect(() => {
    if (!dashboard) return;
    const pageTitle = dashboard?.metadata?.pageTitle ?? null;
    const defaultTheme = dashboard?.metadata?.defaultTheme ?? "light";

    document.title = pageTitle ?? "Fastboard | My Dashboard";
    setTheme(defaultTheme);
  }, [dashboard]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-background">
      <EditorModal mode="view" />
      <Viewport mode="published" />
    </div>
  );
}
