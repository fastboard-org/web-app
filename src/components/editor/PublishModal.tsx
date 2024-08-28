import { dashboardService } from "@/lib/services/dashboards";
import {
  Modal,
  ModalBody,
  ModalContent,
  Snippet,
  Spinner,
} from "@nextui-org/react";

export default function PublishModal({
  isOpen = false,
  isLoading,
  isError,
  publishedDashboard,
  onClose,
}: {
  isOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  publishedDashboard: any;
  onClose: () => void;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

  return (
    <Modal isDismissable={false} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalBody className="p-10">
          {!isError && isLoading && <Spinner />}
          {!isError && !isLoading && publishedDashboard && (
            <div className="flex flex-col gap-y-2">
              <p>Anyone with this link can use your dashboard</p>
              <Snippet
                symbol=""
                variant="solid"
                color="primary"
                classNames={{
                  pre: "truncate",
                }}
              >{`${baseUrl}${publishedDashboard?.id}`}</Snippet>
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
