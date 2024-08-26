"use client";
import EditorModal from "@/components/editor/EditorModal";
import { getLayout } from "@/components/editor/fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { Spinner } from "@nextui-org/react";
import FastboardComponent from "@/components/editor/fastboard-components/FastboardComponent";

export default function Preview() {
  const { dashboard, loading, isError, error, getComponent } = useDashboard();

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

  const header = getComponent(
    dashboard?.metadata?.header?.componentId as string
  );

  const layoutsHeight = dashboard?.metadata?.header?.isVisible ? "90%" : "100%";

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-background">
      <EditorModal mode="view" />
      {dashboard?.metadata?.header?.isVisible && header && (
        <div className="h-[10%] w-full">
          <FastboardComponent
            id={header.id}
            name="Header"
            type={header.type}
            properties={header.properties}
            context={{ type: "header" }}
            mode="view"
            canDelete={false}
          />
        </div>
      )}
      <div className="w-full" style={{ height: layoutsHeight }}>
        {dashboard?.metadata?.layouts?.map((layout, index) =>
          getLayout(layout, index, "view")
        )}
      </div>
    </div>
  );
}
