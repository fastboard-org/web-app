import { isComponentsDrawerOpen, isPropertiesDrawerOpen } from "@/atoms/editor";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Category, Setting2, People } from "iconsax-react";
import { useSetRecoilState } from "recoil";

export default function EditorMenu() {
  const setIsComponentsDrawerOpen = useSetRecoilState(isComponentsDrawerOpen);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);

  return (
    <ButtonGroup size="md" >
      <Button
        className="bg-foreground bg-opacity-5 text-default-400 text-opacity-75"
        isIconOnly
        onClick={() => {
          setIsComponentsDrawerOpen((isOpen) => !isOpen);
          setIsPropertiesDrawerOpen((isOpen) => false);
        }}
      >
        <Category size={20} variant={"Bold"}/>
      </Button>
      <Button
        className="bg-foreground bg-opacity-5 text-foreground-400 text-opacity-75"
        isIconOnly
      >
        <People size={20} variant={"Bold"}/>
      </Button>
      <Button
        className="bg-foreground bg-opacity-5 text-foreground-400 text-opacity-75"
        isIconOnly
      >
        <Setting2 size={20} variant={"Bold"}/>
      </Button>
    </ButtonGroup>
  );
}
