"use client";
import EditorModal from "@/components/editor/EditorModal";
import { getLayout } from "@/components/editor/fastboard-components/utils";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { Spinner } from "@nextui-org/react";
import AuthVerifier from "@/components/editor/auth/AuthVerifier";
import { DashboardAuth } from "@/types/editor";

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
      <AuthVerifier
        dashboardId={dashboard?.id || ""}
        auth={dashboard?.metadata?.auth as DashboardAuth}
        mode="preview"
      >
        <EditorModal mode="view" />
        {dashboard?.metadata?.layouts?.map((layout, index) =>
          getLayout(layout, index, "view"),
        )}
      </AuthVerifier>
    </div>
  );
}
