"use client";
import { getLayout } from "@/components/editor/fastboard-components/utils";
import useDashboard from "@/hooks/useDashboard";
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

  return (
    <div className="flex justify-center items-center h-screen w-full bg-background">
      {dashboardMetadata.layouts.map((layout, index) =>
        getLayout(layout, index, "view")
      )}
    </div>
  );
}
