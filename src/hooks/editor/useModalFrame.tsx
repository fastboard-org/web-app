import { editorModalState, isPropertiesDrawerOpen } from "@/atoms/editor";
import { useSetRecoilState } from "recoil";

const useModalFrame = () => {
  const setEditorModalState = useSetRecoilState(editorModalState);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);

  function openModal(modalId: string) {
    if (!modalId) return;

    setEditorModalState({
      isOpen: true,
      modalId,
    });
  }

  function closeModal() {
    setIsPropertiesDrawerOpen(false);
    setEditorModalState({
      isOpen: false,
      modalId: null,
    });
  }

  return {
    openModal,
    closeModal,
  };
};

export default useModalFrame;
