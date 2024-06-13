import { Button, ButtonGroup } from "@nextui-org/react";
import { Category, Setting2, People } from "iconsax-react";

export default function EditorMenu() {
  return (
    <ButtonGroup>
      <Button isIconOnly>
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
