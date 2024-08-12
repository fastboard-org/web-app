"use client";
import EditorModal from "@/components/editor/EditorModal";
import { getLayout } from "@/components/editor/fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { Spinner } from "@nextui-org/react";

export default function Preview() {
  const { dashboard, loading, isError, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-full bg-background">
      <EditorModal mode="view" />
      {dashboard?.metadata?.layouts?.map((layout, index) =>
        getLayout(layout, index, "view")
      )}
    </div>
  );
}
