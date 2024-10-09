import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Add } from "iconsax-react";

import Option from "@/components/shared/Option";
import {
  CardComponentProperties,
  CardComponentType,
  DefaultCardComponentProperties,
} from "@/types/editor/card-types";
import CardComponentIcon from "./CardComponentIcon";

export default function CardComponentsList({
  components,
  onSelectComponent,
  onChange,
}: {
  components: CardComponentProperties[];
  onSelectComponent?: (component: CardComponentProperties) => void;
  onChange?: (newComponents: CardComponentProperties[]) => void;
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-end w-full">
        <Dropdown placement={"bottom"}>
          <DropdownTrigger>
            <Button startContent={<Add size={20} />} variant={"flat"}>
              Add
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {Object.values(CardComponentType).map((type) => (
              <DropdownItem
                key={type}
                onPress={() => {
                  onChange?.([
                    ...components,
                    DefaultCardComponentProperties.of(type),
                  ]);
                }}
                startContent={<CardComponentIcon type={type} size={15} />}
              >
                {type}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <ul className="flex flex-col space-y-2 w-full pt-2">
        {components.map((component, index) => (
          <Option
            key={index}
            label={component.type}
            startIcon={<CardComponentIcon type={component.type} size={12} />}
            onPress={() => {
              onSelectComponent?.(component);
            }}
            onDelete={() => {
              const newComponents = [...components];
              newComponents.splice(index, 1);
              onChange?.(newComponents);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
