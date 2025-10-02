import useDashboard from "@/hooks/dashboards/useDashboard";
import AuthVerifier from "../editor/auth/AuthVerifier";
import FastboardComponent from "../editor/fastboard-components/FastboardComponent";
import { useSetRecoilState } from "recoil";
import {
  previewAccessTokenState,
  previewRefreshTokenState,
} from "@/atoms/editor";
import useNavigation from "@/hooks/useNavigation";
import { useEffect, useState } from "react";
import { getLayout } from "../editor/fastboard-components/utils";
import { Spinner, Button } from "@nextui-org/react";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { HambergerMenu } from "iconsax-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Viewport({
  mode,
}: {
  mode: "editor" | "preview" | "published";
}) {
  const { dashboard, loading, isError, error, getComponent } = useDashboard(
    mode === "editor" || mode === "preview" ? "editor" : "published",
  );
  const setPreviewAccessToken = useSetRecoilState(previewAccessTokenState);
  const setPreviewRefreshToken = useSetRecoilState(previewRefreshTokenState);
  const { currentPage } = useNavigation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (mode === "editor" && dashboard?.metadata?.auth?.previewAccessToken) {
      setPreviewAccessToken(dashboard.metadata.auth.previewAccessToken);
    }

    if (mode === "editor" && dashboard?.metadata?.auth?.previewRefreshToken) {
      setPreviewRefreshToken(dashboard.metadata.auth.previewRefreshToken);
    }
  }, [dashboard]);

  // Close mobile sidebar when page changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [currentPage]);

  const sidebarVisible = dashboard?.metadata?.sidebar?.visible ?? false;
  const isHeaderVisible = dashboard?.metadata?.header?.isVisible ?? false;
  const layoutsWidth = dashboard?.metadata?.sidebar?.visible
    ? "calc(100% - 256px)"
    : "100%";
  const layoutsHeight = isHeaderVisible ? "90%" : "100%";
  const header = getComponent(
    dashboard?.metadata?.header?.componentId as string,
  );
  const sidebar = dashboard?.metadata?.sidebar?.id
    ? getComponent(dashboard.metadata.sidebar?.id)
    : null;
  const selectedPage = dashboard?.metadata?.pages[currentPage]
    ? currentPage
    : "home";

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
      
      {/* Hamburger menu button for mobile */}
      {sidebar && sidebarVisible && (
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="md:hidden fixed top-4 left-4 z-50"
        >
          <Button
            isIconOnly
            variant="flat"
            className="bg-background shadow-lg"
            onPress={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <motion.div
              animate={{ rotate: isMobileSidebarOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <HambergerMenu size={24} />
            </motion.div>
          </Button>
        </motion.div>
      )}

      <div
        className="flex flex-row h-full w-full"
        style={{
          height: layoutsHeight,
        }}
      >
        {/* Desktop sidebar - hidden on mobile */}
        {sidebar && sidebarVisible && (
          <div className="hidden md:block min-w-[256px] h-full">
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

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebar && sidebarVisible && isMobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
              {/* Sidebar drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  mass: 0.8
                }}
                className="md:hidden fixed left-0 top-0 h-full w-64 z-50 shadow-xl"
              >
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
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="w-full md:min-w-96 h-full " style={{ width: mode === "editor" ? layoutsWidth : undefined }}>
          {dashboard?.metadata?.pages[selectedPage].map((layout, index) =>
            getLayout(
              layout,
              currentPage,
              index,
              mode === "editor" ? "editable" : "view",
            ),
          )}
        </div>
      </div>
    </AuthVerifier>
  );
}
