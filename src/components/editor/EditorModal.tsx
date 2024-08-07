import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { editorCanvasRefState, editorModalState } from "@/atoms/editor";
import { useParams } from "next/navigation";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { getModalFrame } from "@/lib/editor.utils";
import FastboardComponent from "./fastboard-components/FastboardComponent";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import useModalFrame from "@/hooks/editor/useModalFrame";

export default function EditorModal({
  mode = "editable",
}: {
  mode?: "editable" | "view";
}) {
  const { id } = useParams();
  const { dashboard } = useDashboard(id as string);
  const editorCanvasRef = useRecoilValue(editorCanvasRefState);
  const { isOpen, modalId } = useRecoilValue(editorModalState);
  const { closeModal } = useModalFrame();

  if (!dashboard || !modalId) {
    return null;
  }

  const modalFrame = getModalFrame(modalId, dashboard.metadata);

  return (
    <>
      {modalFrame && modalFrame?.body && (
        <Modal
          isOpen={isOpen}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              closeModal();
            }
          }}
          portalContainer={editorCanvasRef || document.body}
          isDismissable={false}
          scrollBehavior="inside"
          className="p-4"
          classNames={{
            backdrop: "h-full w-full",
            body: `${scrollbarStyles.scrollbar}`,
            wrapper: `h-full w-full ${scrollbarStyles.scrollbar}`,
          }}
        >
          <ModalContent>
            <ModalBody>
              <FastboardComponent
                name={modalFrame.body.type}
                type={modalFrame.body.type}
                layoutIndex={0}
                containerIndex={"container1"}
                properties={modalFrame.body.properties}
                context={{
                  type: "modal",
                  modalContext: {
                    modalId: modalFrame.id,
                  },
                }}
                mode={mode}
                canDelete={false}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
