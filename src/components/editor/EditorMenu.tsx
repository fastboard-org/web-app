import {
  isAuthDrawerOpen,
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
  isSettingsDrawerOpen,
} from "@/atoms/editor";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Category, Setting2, Lock1 } from "iconsax-react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function EditorMenu() {
  const [isComponentsOpen, setIsComponentsDrawerOpen] = useRecoilState(
    isComponentsDrawerOpen,
  );
  const [isSettingsOpen, setIsSettingsDrawerOpen] =
    useRecoilState(isSettingsDrawerOpen);
  const [isAuthModalOpen, setIsAuthModalOpen] =
    useRecoilState(isAuthDrawerOpen);

  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);

  const buttonClassname = (isOpen: boolean) => {
    return isOpen
      ? "bg-foreground bg-opacity-[0.07] text-primary"
      : "bg-foreground bg-opacity-5 text-foreground-400 text-opacity-75 opacity-60";
  };

  return (
    <ButtonGroup size="md">
      <Button
        className={buttonClassname(isComponentsOpen)}
        isIconOnly
        onClick={() => {
          setIsComponentsDrawerOpen((isOpen) => !isOpen);
          setIsPropertiesDrawerOpen((isOpen) => false);
          setIsSettingsDrawerOpen((isOpen) => false);
          setIsAuthModalOpen((isOpen) => false);
        }}
      >
        <Category size={20} variant={"Bold"} />
      </Button>
      <Button
        className={buttonClassname(isAuthModalOpen)}
        isIconOnly
        onClick={() => {
          setIsAuthModalOpen((isOpen) => !isOpen);
          setIsComponentsDrawerOpen((isOpen) => false);
          setIsSettingsDrawerOpen((isOpen) => false);
          setIsPropertiesDrawerOpen((isOpen) => false);
        }}
      >
        <Lock1 size={20} variant={"Bold"} />
      </Button>
      <Button
        className={buttonClassname(isSettingsOpen)}
        isIconOnly
        onClick={() => {
          setIsSettingsDrawerOpen((isOpen) => !isOpen);
          setIsComponentsDrawerOpen((isOpen) => false);
          setIsPropertiesDrawerOpen((isOpen) => false);
          setIsAuthModalOpen((isOpen) => false);
        }}
      >
        <Setting2 size={20} variant={"Bold"} />
      </Button>
    </ButtonGroup>
  );
}
