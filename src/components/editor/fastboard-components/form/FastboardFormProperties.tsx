import { FormProperties } from "@/types/editor/form";
import { Input } from "@nextui-org/react";

export default function FastboardFormProperties({
  properties,
}: {
  properties: FormProperties;
}) {
  const { title } = properties;

  return (
    <Input
      label="Title"
      labelPlacement="outside"
      placeholder="Form title"
      value={title}
    />
  );
}
