import { Button } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { editorCanvasRefState, editorModalState } from "@/atoms/editor";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { getModalFrame } from "@/lib/editor.utils";
import FastboardComponent from "./fastboard-components/FastboardComponent";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import useModalFrame from "@/hooks/editor/useModalFrame";
import { createPortal } from "react-dom";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { IoIosClose } from "react-icons/io";

export const TRANSITION_EASINGS = {
  ease: [0.36, 0.66, 0.4, 1],
} as const;

export const TRANSITION_VARIANTS = {
  fade: {
    enter: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: TRANSITION_EASINGS.ease,
      },
    },
  },
};

export const scaleInOut = {
  enter: {
    scale: "var(--scale-enter)",
    y: "var(--slide-enter)",
    opacity: 1,
    transition: {
      scale: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
      opacity: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
      y: {
        type: "spring",
        bounce: 0,
        duration: 0.6,
      },
    },
  },
  exit: {
    scale: "var(--scale-exit)",
    y: "var(--slide-exit)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: TRANSITION_EASINGS.ease,
    },
  },
};

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
      {modalFrame &&
        isOpen &&
        createPortal(
          <AnimatePresence>
            <LazyMotion features={domAnimation}>
              <m.div
                className="flex items-center justify-center fixed inset-0 bg-foreground-900 bg-opacity-50 dark:bg-black dark:bg-opacity-80 z-50 "
                animate="enter"
                exit="exit"
                initial="exit"
                variants={TRANSITION_VARIANTS.fade}
              >
                <LazyMotion features={domAnimation}>
                  <m.div
                    animate="enter"
                    className={
                      "bg-background dark:bg-content1 w-[95%] max-h-[85vh] md:w-auto md:h-auto md:min-w-[40%] md:max-h-[90%] md:max-w-[90%] py-4 px-5 rounded-xl shadow-xl absolute overflow-auto " +
                      scrollbarStyles.scrollbar
                    }
                    data-slot="wrapper"
                    exit="exit"
                    initial="exit"
                    variants={scaleInOut}
                  >
                    <div
                      key="modal-header"
                      className="flex justify-end pb-1 absolute z-50 right-2"
                    >
                      <Button
                        onPress={closeModal}
                        variant="light"
                        isIconOnly
                        radius="full"
                        size="sm"
                        className=""
                      >
                        <IoIosClose size={30} />
                      </Button>
                    </div>
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
                  </m.div>
                </LazyMotion>
              </m.div>
            </LazyMotion>
          </AnimatePresence>,
          editorCanvasRef || document.body
        )}
    </>
  );
}
