"use client";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import PublishOption from "@/types/editor";

export default function PublishButton() {
  const publishOptions: PublishOption[] = [
    {
      label: "Publish",
      description: "Publish this dashboard.",
    },
    {
      label: "As template",
      description: "Public this dashboard as template in the community.",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(
    new Set([publishOptions[0].label])
  );

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <ButtonGroup color="primary">
      <Button className="w-[100px]">{selectedOptionValue}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <IoMdArrowDropdown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Publish options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
        >
          {publishOptions.map((option: PublishOption) => (
            <DropdownItem key={option.label} description={option.description}>
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
