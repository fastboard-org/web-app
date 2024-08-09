import { editorModalState, isPropertiesDrawerOpen } from "@/atoms/editor";
import { useSetRecoilState } from "recoil";

const useModalFrame = () => {
  const setEditorModalState = useSetRecoilState(editorModalState);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);

  function closeModal() {
    setIsPropertiesDrawerOpen(false);
    setEditorModalState({
      isOpen: false,
      modalId: null,
    });
  }

  return {
    closeModal,
  };
};

export default useModalFrame;
