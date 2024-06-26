"use client";
import { dashboardMetadataState } from "@/atoms/editor";
import FullLayout from "@/components/editor/layouts/FullLayout";
import { Layout, LayoutType } from "@/types/editor";
import { useRecoilValue } from "recoil";

export default function Preview() {
  const dashboardMetadata = useRecoilValue(dashboardMetadataState);

  function getLayoutComponent(layout: Layout, index: number) {
    switch (layout.type) {
      case LayoutType.Full:
        return (
          <FullLayout
            index={index}
            isEditor={false}
            component1={dashboardMetadata.layouts[index].component1}
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
