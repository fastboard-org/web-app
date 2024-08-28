"use client";
import { Button, Spacer } from "@nextui-org/react";
import { useParams } from "next/navigation";
import PublishModal from "./PublishModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboards";
import { useRecoilValue } from "recoil";
import { lastDashboardMetadata } from "@/atoms/editor";

export default function PublishButton() {
  const { id: dashboardId } = useParams();
  const lastMetadata = useRecoilValue(lastDashboardMetadata);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  function handlePreview() {
    window.open(`/editor/${dashboardId}/preview`, "_blank");
  }

  function handlePublish() {
    setIsPublishModalOpen(true);
    //publish();
  }

  return (
    <div className="flex flex-row items-center">
      <Button variant="flat" onClick={handlePreview}>
        Preview
      </Button>
      <Spacer x={3} />
      <Button
        color="primary"
        isLoading={lastMetadata !== null}
        onPress={handlePublish}
      >
        Publish
      </Button>
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
        }}
      />
    </div>
  );
}
