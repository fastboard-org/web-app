import Option from "@/components/shared/Option";
import {
  DefaultFilterProperties,
  FilterProperties,
  FilterType,
} from "@/types/editor/table-types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Add } from "iconsax-react";

export default function FiltersList({
  filters,
  onFilterSelect,
  onChange,
}: {
  filters: FilterProperties[];
  onFilterSelect?: (filter: FilterProperties) => void;
  onChange?: (filters: FilterProperties[]) => void;
}) {
  function formatString(input: string): string {
    let result = input.replace(/-/g, " ");

    if (result.length > 0) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
  }

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
            {Object.values(FilterType).map((type) => (
              <DropdownItem
                key={type}
                onPress={() => {
                  onChange?.([...filters, DefaultFilterProperties.of(type)]);
                }}
              >
                {formatString(type)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <ul className="w-full rounded-lg pt-2 space-y-2">
        {filters.map((filter, index) => (
          <Option
            key={index}
            label={formatString(filter.type)}
            onPress={() => {
              onFilterSelect?.(filter);
            }}
            onDelete={() => {
              const newFilters = [...filters];
              newFilters.splice(index, 1);
              onChange?.(newFilters);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
