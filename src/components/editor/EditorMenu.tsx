import { isComponentsDrawerOpen } from "@/atoms/editor";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Category, Setting2, People } from "iconsax-react";
import { useSetRecoilState } from "recoil";

export default function EditorMenu() {
  const setIsComponentsDrawerOpen = useSetRecoilState(isComponentsDrawerOpen);

  return (
    <ButtonGroup>
      <Button
        isIconOnly
        onClick={() => {
          setIsComponentsDrawerOpen((isOpen) => !isOpen);
        }}
      >
        <Category size={20} />
      </Button>
      <Button isIconOnly>
        <People size={20} />
      </Button>
      <Button isIconOnly>
        <Setting2 size={20} />
      </Button>
    </ButtonGroup>
  );
}
