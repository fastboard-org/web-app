import { Input } from "@nextui-org/react";

export default function FieldValue({
  field,
  onFieldChange,
}: {
  field: string;
  onFieldChange: (field: string) => void;
}) {
  return (
    <Input
      classNames={{
        mainWrapper: "w-full",
      }}
      label="Field: "
      labelPlacement="outside-left"
      startContent={
        <span className={"text-sm text-foreground-400"}>{"data."}</span>
      }
      value={field}
      onValueChange={(value) => onFieldChange(value)}
    />
  );
}
