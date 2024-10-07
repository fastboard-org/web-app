import { Checkbox } from "@nextui-org/react";

export default function CheckBoxProperty({
  label,
  isSelected,
  onValueChange,
}: {
  label: string;
  isSelected: boolean;
  onValueChange: (isSelected: boolean) => void;
}) {
  return (
    <div className="flex flex-row justify-between">
      <span className="text-sm">{label}</span>
      <Checkbox isSelected={isSelected} onValueChange={onValueChange} />
    </div>
  );
}
