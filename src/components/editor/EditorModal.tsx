import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  editorCanvasRefState,
  editorModalState,
  isPropertiesDrawerOpen,
} from "@/atoms/editor";
import { useParams } from "next/navigation";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { getModalFrame } from "@/lib/editor.utils";
import FastboardComponent from "./fastboard-components/FastboardComponent";

export default function EditorModal({
  mode = "editable",
}: {
  mode?: "editable" | "view";
}) {
  const { id } = useParams();
  const { dashboard } = useDashboard(id as string);
  const editorCanvasRef = useRecoilValue(editorCanvasRefState);
  const { isOpen, modalId } = useRecoilValue(editorModalState);
  const setEditorModalState = useSetRecoilState(editorModalState);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);

  if (!dashboard || !modalId) {
    return null;
  }

  const modalFrame = getModalFrame(modalId, dashboard.metadata);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsPropertiesDrawerOpen(false);
        }
        setEditorModalState({
          isOpen: isOpen,
          modalId: null,
        });
      }}
      portalContainer={editorCanvasRef || document.body}
      isDismissable={false}
      className=""
    >
      <ModalContent>
        <ModalBody>
          {modalFrame && modalFrame.body && (
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
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
