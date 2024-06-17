"use client";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
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
  const [selectedOption, setSelectedOption] = useState(publishOptions[0].label);

  return (
    <div className="flex flex-row items-center">
      <Button variant="flat">Preview</Button>
      <Spacer x={1} />
      <ButtonGroup color="primary">
        <Button className="w-[100px]">{selectedOption}</Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly>
              <IoMdArrowDropdown />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Publish options"
            selectionMode="single"
            onSelectionChange={(option) => setSelectedOption(option as string)}
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
    </div>
  );
}
