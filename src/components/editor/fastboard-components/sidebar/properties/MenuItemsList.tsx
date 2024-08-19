import useDashboard from "@/hooks/dashboards/useDashboard";
import { LayoutType } from "@/types/editor/layout-types";
import { MenuItemProperties } from "@/types/editor/sidebar-types";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Add } from "iconsax-react";
import { IoIosClose } from "react-icons/io";

export default function MenuItemsList({
  items,
  onValueChange,
  onSelectMenuItem,
}: {
  items: MenuItemProperties[];
  onValueChange: (items: MenuItemProperties[]) => void;
  onSelectMenuItem: (index: number) => void;
}) {
  const { addPage, deletePage } = useDashboard();

  function addMenuItem() {
    const pageId = addPage();
    if (!pageId) return;
    onValueChange([
      ...items,
      { key: pageId, label: `New page`, caption: "", layout: LayoutType.Full },
    ]);
  }

  function removeMenuItem(index: number) {
    deletePage(items[index].key);
    const newItems = [...items];
    newItems.splice(index, 1);
    onValueChange(newItems);
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-end w-full">
        <Button
          startContent={<Add size={20} />}
          variant={"flat"}
          onPress={addMenuItem}
        >
          Add item
        </Button>
      </div>

      <ul className="flex flex-col space-y-2 w-full pt-2">
        {items.map((item, index) => (
          <ButtonGroup className="flex flex-row justify-between rounded-xl border border-content3">
            <Button
              className="w-full"
              variant="light"
              onPress={() => onSelectMenuItem(index)}
              startContent={
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p>{item.label}</p>
                </div>
              }
            >
              <div className="w-full"></div>
            </Button>
            {item.key !== "home" && (
              <Button
                variant="light"
                isIconOnly
                onPress={() => removeMenuItem(index)}
              >
                <IoIosClose size={20} className="text-foreground-600" />
              </Button>
            )}
          </ButtonGroup>
        ))}
      </ul>
    </div>
  );
}
