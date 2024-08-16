import { Checkbox } from "@nextui-org/react";

export default function HeaderCheckbox({
  isSelected,
  onValueChange,
}: {
  isSelected: boolean;
  onValueChange: (isSelected: boolean) => void;
}) {
  return (
    <Checkbox
      isSelected={isSelected}
      onValueChange={(isSelected) => {
        onValueChange(isSelected);
      }}
    >
      Show Header
    </Checkbox>
  );
}
