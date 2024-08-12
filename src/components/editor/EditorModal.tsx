import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { editorCanvasRefState, editorModalState } from "@/atoms/editor";
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
  const { dashboard, getComponent } = useDashboard();
  const editorCanvasRef = useRecoilValue(editorCanvasRefState);
  const { isOpen, modalId } = useRecoilValue(editorModalState);
  const { closeModal } = useModalFrame();

  if (!dashboard || !modalId) {
    return null;
  }

  const modalFrame = getModalFrame(modalId, dashboard.metadata);
  const component = modalFrame?.body ? getComponent(modalFrame.body) : null;

  if (!component) {
    return null;
  }

  return (
    <>
      {modalFrame && (
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
          className="p-2"
          classNames={{
            backdrop: "h-full w-full",
            body: `${scrollbarStyles.scrollbar}`,
            wrapper: `h-full w-full ${scrollbarStyles.scrollbar}`,
          }}
        >
          <ModalContent>
            <ModalBody>
              <FastboardComponent
                id={component.id}
                name={component.type}
                type={component.type}
                properties={component.properties}
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
