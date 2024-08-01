import { FormProperties } from "@/types/editor/form";
import { Input } from "@nextui-org/react";
import QuerySelection from "../../QuerySelection";

export default function FastboardFormProperties({
  properties,
  onValueChange,
}: {
  properties: FormProperties;
  onValueChange: (properties: FormProperties) => void;
}) {
  const { title, query } = properties;

  return (
    <div>
      <Input
        label="Title"
        labelPlacement="outside"
        placeholder="Form title"
        value={title}
      />
      <QuerySelection
        selectedQueryId={query?.id || ""}
        onQuerySelect={(query) => {
          onValueChange({
            ...properties,
            query: query,
          });
        }}
      />
    </div>
  );
}
