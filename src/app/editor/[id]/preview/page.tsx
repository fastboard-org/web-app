"use client";
import EditorModal from "@/components/editor/EditorModal";
import FastboardComponent from "@/components/editor/fastboard-components/FastboardComponent";
import { getLayout } from "@/components/editor/fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";
import useNavigation from "@/hooks/useNavigation";
import { Spinner } from "@nextui-org/react";
import AuthVerifier from "@/components/editor/auth/AuthVerifier";
import { DashboardAuth } from "@/types/editor";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";

export default function Preview() {
  const { dashboard, loading, isError, error, getComponent } = useDashboard();
  const { currentPage } = useNavigation();
  const header = getComponent(
    dashboard?.metadata?.header?.componentId as string
  );
  const layoutsHeight = dashboard?.metadata?.header?.isVisible ? "90%" : "100%";
  const layoutsWidth = dashboard?.metadata?.sidebar?.visible ? "85%" : "100%";
  const sidebar = dashboard?.metadata?.sidebar
    ? getComponent(dashboard.metadata.sidebar.id)
    : null;
  const selectedPage = dashboard?.metadata?.pages[currentPage]
    ? currentPage
    : "home";
  const sidebarVisible = dashboard?.metadata?.sidebar?.visible ?? false;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    if ((error as AxiosError).response?.status === 404) {
      notFound();
    }

    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-background">
      <AuthVerifier
        dashboardId={dashboard?.id || ""}
        auth={dashboard?.metadata?.auth}
        mode="preview"
      >
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
        <div
          className="flex flex-row w-full"
          style={{
            height: layoutsHeight,
          }}
        >
          {sidebar && sidebarVisible && (
            <div className="w-[15%] h-full">
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
          <div
            className="w-full"
            style={{
              width: layoutsWidth,
            }}
          >
            {dashboard?.metadata?.pages[selectedPage].map((layout, index) =>
              getLayout(layout, currentPage, index, "view")
            )}
          </div>
        </div>
      </AuthVerifier>
    </div>
  );
}
