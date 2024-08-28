import useDashboard from "@/hooks/dashboards/useDashboard";
import { dashboardService } from "@/lib/services/dashboards";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Snippet,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function PublishModal({
  isOpen = false,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { id: dashboardId } = useParams();
  const { data: currentPublishedDashboard, isPending: gettingPublished } =
    useQuery({
      queryKey: ["dashboard", dashboardId, "publish_status"],
      queryFn: () => {
        return dashboardService.getPublishedDashboard(dashboardId as string);
      },
      refetchOnWindowFocus: false,
    });
  const {
    mutate: publish,
    data: publishedDashboard,
    isPending: isPublishing,
    isError,
  } = useMutation({
    mutationFn: () => {
      return dashboardService.publishDashboard(dashboardId as string);
    },
  });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

  return (
    <Modal isDismissable={false} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalBody className="p-10">
          <div className="flex flex-row justify-between items-center gap-x-2">
            <p className="text-lg font-semibold">Publish your dashboard</p>
            {currentPublishedDashboard || publishedDashboard ? (
              <Tooltip
                placement="right"
                content={
                  <div className="text-center text-sm text-warning-600">
                    This action will replace the current published version
                  </div>
                }
                className="bg-warning-100"
              >
                <Button color="primary" onPress={() => publish()}>
                  Update
                </Button>
              </Tooltip>
            ) : (
              <Button color="primary" onPress={() => publish()}>
                Publish
              </Button>
            )}
          </div>
          {!isError && (isPublishing || gettingPublished) && <Spinner />}
          {!isError &&
            !gettingPublished &&
            !isPublishing &&
            (currentPublishedDashboard || publishedDashboard) && (
              <div className="flex flex-col gap-y-2">
                <Snippet
                  symbol=""
                  variant="solid"
                  color="primary"
                  classNames={{
                    pre: "truncate",
                  }}
                >{`${baseUrl}${
                  currentPublishedDashboard?.id ?? publishedDashboard?.id
                }`}</Snippet>
                <p className="text-sm text-center">
                  Anyone with this link can use your dashboard
                </p>
              </div>
            )}
          {isError && (
            <div className="flex justify-center">
              <span className="text-danger">
                Something went wrong. Try again later
              </span>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
