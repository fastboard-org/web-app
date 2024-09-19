import useDashboard from "@/hooks/dashboards/useDashboard";
import AuthVerifier from "../editor/auth/AuthVerifier";
import FastboardComponent from "../editor/fastboard-components/FastboardComponent";
import { useSetRecoilState } from "recoil";
import { previewAccessTokenState } from "@/atoms/editor";
import useNavigation from "@/hooks/useNavigation";
import { useEffect } from "react";
import { getLayout } from "../editor/fastboard-components/utils";
import { Button, Spinner } from "@nextui-org/react";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { Back } from "iconsax-react";

export default function Viewport({
  mode,
}: {
  mode: "editor" | "preview" | "published";
}) {
  const { dashboard, loading, isError, error, getComponent } = useDashboard(
    mode === "editor" || mode === "preview" ? "editor" : "published"
  );
  const setPreviewAccessToken = useSetRecoilState(previewAccessTokenState);
  const { currentPage, changePage } = useNavigation();

  useEffect(() => {
    if (mode === "editor" && dashboard?.metadata?.auth?.previewAccessToken) {
      setPreviewAccessToken(dashboard.metadata.auth.previewAccessToken);
    }
  }, [dashboard]);

  const sidebarVisible = dashboard?.metadata?.sidebar?.visible ?? false;
  const isHeaderVisible = dashboard?.metadata?.header?.isVisible ?? false;
  const layoutsWidth = dashboard?.metadata?.sidebar?.visible
    ? "calc(100% - 256px)"
    : "100%";
  const layoutsHeight = isHeaderVisible ? "90%" : "100%";
  const header = getComponent(
    dashboard?.metadata?.header?.componentId as string
  );
  const sidebar = dashboard?.metadata?.sidebar?.id
    ? getComponent(dashboard.metadata.sidebar?.id)
    : null;
  const selectedPage = dashboard?.metadata?.pages[currentPage];

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
    <AuthVerifier
      dashboardId={dashboard?.id || ""}
      auth={dashboard?.metadata?.auth}
      mode={mode === "editor" ? "editor" : "preview"}
    >
      {isHeaderVisible && header && (
        <div className="h-[10%] w-full">
          <FastboardComponent
            id={header.id}
            name="Header"
            type={header.type}
            properties={header.properties}
            context={{ type: "header" }}
            mode={mode === "editor" ? "editable" : "view"}
            canDelete={false}
          />
        </div>
      )}
      <div
        className="flex flex-row h-full w-full"
        style={{
          height: layoutsHeight,
        }}
      >
        {sidebar && sidebarVisible && (
          <div className="w-64 h-full">
            <FastboardComponent
              id={sidebar.id}
              name="sidebar"
              type={sidebar.type}
              properties={sidebar.properties}
              context={{
                type: "sidebar",
              }}
              canDelete={false}
              mode={mode === "editor" ? "editable" : "view"}
            />
          </div>
        )}
        <div
          className="flex flex-col min-w-96 h-full"
          style={{ width: layoutsWidth }}
        >
          {selectedPage && selectedPage.returnPage && (
            <Button
              isIconOnly
              variant="light"
              className="mx-2 mt-1"
              onPress={() => {
                if (!selectedPage.returnPage) return;
                changePage(selectedPage.returnPage);
              }}
            >
              <Back />
            </Button>
          )}
          {selectedPage &&
            selectedPage.layouts.map((layout, index) =>
              getLayout(
                layout,
                currentPage,
                index,
                mode === "editor" ? "editable" : "view"
              )
            )}
        </div>
      </div>
    </AuthVerifier>
  );
}
