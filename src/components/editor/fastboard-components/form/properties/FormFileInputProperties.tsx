import { FileInputProperties } from "@/types/editor/form";
import { Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import QueryParameterSelection from "../../../../shared/QueryParameterSelection";
import CheckBoxProperty from "@/components/shared/CheckBoxProperty";

export default function FormFileInputProperties({
  properties,
  queryId,
  onValueChange,
  disabledKeys = [],
}: {
  properties: FileInputProperties;
  queryId: string | null;
  onValueChange: (properties: FileInputProperties) => void;
  disabledKeys?: string[];
}) {
  const { label, required, formDataKey, accept } = properties;

  return (
    <div className="flex flex-col gap-y-2">
      <QueryParameterSelection
        selectedKey={formDataKey}
        disabledKeys={disabledKeys}
        queryId={queryId}
        onSelectionChange={(formDataKey) => {
          onValueChange({
            ...properties,
            formDataKey: formDataKey,
          });
        }}
      />
      {formDataKey !== "" && (
        <div>
          <CheckBoxProperty
            label="Required"
            isSelected={required}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                required: value,
              });
            }}
          />
        </div>
      )}
      <Select
        label="File type"
        labelPlacement="outside"
        placeholder="Select file type"
        selectionMode="multiple"
        disallowEmptySelection={true}
        selectedKeys={accept}
        onChange={(e) => {
          let keys = e.target.value.split(",");
          console.log(keys);
          if (keys.at(0) === "all" && keys.length > 1) {
            keys = keys.slice(1);
          } else if (keys.includes("all")) {
            keys = ["all"];
          }
          onValueChange({
            ...properties,
            accept: keys,
          });
        }}
      >
        <SelectItem key={"all"}>All</SelectItem>
        <SelectItem key={"image/*"}>Image</SelectItem>
        <SelectItem key={"video/*"}>Video</SelectItem>
        <SelectItem key={"audio/*"}>Audio</SelectItem>
      </Select>
      <Input
        aria-label="File input label property"
        label="Label"
        labelPlacement="outside"
        placeholder="Label"
        value={label}
        onValueChange={(value) => {
          onValueChange({
            ...properties,
            label: value,
          });
        }}
      />
    </div>
  );
}
