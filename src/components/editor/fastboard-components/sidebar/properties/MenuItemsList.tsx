import useDashboard from "@/hooks/dashboards/useDashboard";
import { MenuItemProperties } from "@/types/editor/sidebar-types";
import { Button } from "@nextui-org/react";
import { Add } from "iconsax-react";

export default function MenuItemsList({
  items,
  onValueChange,
}: {
  items: MenuItemProperties[];
  onValueChange: (items: MenuItemProperties[]) => void;
}) {
  const { addPage } = useDashboard();

  function addMenuItem() {
    const pageId = addPage();
    if (!pageId) return;
    onValueChange([...items, { key: pageId, label: `New page`, caption: "" }]);
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
          <li key={index} className="flex flex-row items-center space-x-2">
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
