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
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";
import PublishOption from "@/types/editor";
import { useParams } from "next/navigation";

export default function PublishButton() {
  const { id: dashboardId } = useParams();
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

  function handlePreview() {
    //TODO: open preview with current dashboard id
    window.open(`/editor/${dashboardId}/preview`, "_blank");
  }

  return (
    <div className="flex flex-row items-center">
      <Button variant="flat" onClick={handlePreview}>
        Preview
      </Button>
      <Spacer x={3} />
      <ButtonGroup color="primary">
        <Button>{selectedOption}</Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly>
              <ArrowDown2 size={18} />
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
