"use client";
import { dashboardMetadataState } from "@/atoms/editor";
import FullLayout from "@/components/editor/layouts/FullLayout";
import { Layout, LayoutType } from "@/types/editor";
import { useRecoilValue } from "recoil";

export default function Preview() {
  const dashboardMetadata = useRecoilValue(dashboardMetadataState);

  function getLayoutComponent(layout: Layout) {
    switch (layout.type) {
      case LayoutType.Full:
        return (
          <FullLayout
            index={0}
            component1={dashboardMetadata.layouts[0].component1}
          />
        );
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full bg-background">
      {getLayoutComponent(dashboardMetadata.layouts[0])}
    </div>
  );
}
