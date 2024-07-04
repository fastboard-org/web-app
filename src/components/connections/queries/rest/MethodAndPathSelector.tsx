import { Input, Select, SelectItem } from "@nextui-org/react";
import { HTTP_METHOD } from "@/types/connections";

const MethodAndPathSelector = ({
  method,
  path,
  onMethodChange,
  onPathChange,
}: {
  method: HTTP_METHOD;
  path: string;
  onMethodChange: (method: string) => void;
  onPathChange: (path: string) => void;
}) => {
  return (
    <div className={"flex w-full gap-3"}>
      <Select
        className={"w-1/5 min-w-[100px]"}
        placeholder={"Method"}
        selectedKeys={[method]}
        disallowEmptySelection
        onChange={(e) => onMethodChange(e.target.value as string)}
      >
        {Object.keys(HTTP_METHOD).map((method) => (
          <SelectItem key={method} value={method}>
            {method}
          </SelectItem>
        ))}
      </Select>
      <Input
        startContent={
          <span className={"text-sm text-foreground-400"}>{"{{mainUrl}}"}</span>
        }
        isClearable
        value={path}
        onChange={(e) => onPathChange(e.target.value)}
        onClear={() => onPathChange("")}
      />
    </div>
  );
};

export default MethodAndPathSelector;
