import { isComponentsDrawerOpen, isPropertiesDrawerOpen } from "@/atoms/editor";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Category, Setting2, People } from "iconsax-react";
import { useSetRecoilState } from "recoil";

export default function EditorMenu() {
  const setIsComponentsDrawerOpen = useSetRecoilState(isComponentsDrawerOpen);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);

  return (
    <ButtonGroup size="sm">
      <Button
        isIconOnly
        onClick={() => {
          setIsComponentsDrawerOpen((isOpen) => !isOpen);
          setIsPropertiesDrawerOpen((isOpen) => false);
        }}
      >
        <Category size={20} />
      </Button>
      <Button isIconOnly>
        <People size={20} />
      </Button>
      <Button
        isIconOnly
        onClick={() => {
          setIsPropertiesDrawerOpen((isOpen) => !isOpen);
          setIsComponentsDrawerOpen((isOpen) => false);
        }}
      >
        <Setting2 size={20} />
      </Button>
    </ButtonGroup>
  );
}
