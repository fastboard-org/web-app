"use client";
import { currentPageState } from "@/atoms/editor";
import EditorModal from "@/components/editor/EditorModal";
import FastboardComponent from "@/components/editor/fastboard-components/FastboardComponent";
import { getLayout } from "@/components/editor/fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { Spinner } from "@nextui-org/react";
import { useRecoilValue } from "recoil";

export default function Preview() {
  const { dashboard, loading, isError, error, getComponent } = useDashboard();
  const currentPage = useRecoilValue(currentPageState);
  const sidebar = dashboard?.metadata?.sidebar
    ? getComponent(dashboard.metadata.sidebar)
    : null;

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
    <div className="flex flex-row w-full h-screen">
      {sidebar && (
        <div className="w-[20%] h-full">
          <FastboardComponent
            id={sidebar.id}
            name="sidebar"
            type={sidebar.type}
            properties={sidebar.properties}
            context={{
              type: "sidebar",
            }}
            canDelete={false}
            mode="view"
          />
        </div>
      )}
      <div className="flex justify-center items-center h-screen w-full bg-background">
        <EditorModal mode="view" />
        {currentPage &&
          dashboard?.metadata?.pages[currentPage] &&
          dashboard?.metadata?.pages[currentPage].map((layout, index) =>
            getLayout(layout, currentPage, index, "view")
          )}
      </div>
    </div>
  );
}
