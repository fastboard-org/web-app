"use client";
import FullLayout from "@/components/editor/layouts/FullLayout";
import useDashboard from "@/hooks/useDashboard";
import { Layout, LayoutType } from "@/types/editor";
import { Spinner } from "@nextui-org/react";

export default function Preview() {
  const { dashboard: dashboardMetadata, loading } = useDashboard("1");

  if (loading || !dashboardMetadata) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    );
  }

  function getLayoutComponent(layout: Layout, index: number) {
    switch (layout.type) {
      case LayoutType.Full:
        return (
          <FullLayout
            index={index}
            component1={dashboardMetadata?.layouts[index].component1}
            mode="view"
          />
        );
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full bg-background">
      {dashboardMetadata.layouts.map((layout, index) =>
        getLayoutComponent(layout, index)
      )}
    </div>
  );
}
