import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { HTTP_METHOD } from "@/types/connections";
import { methodColor } from "@/lib/rest-methods";

const MethodAndPathSelector = ({
  method,
  path,
  onMethodChange,
  onPathChange,
  onSendClick,
  loading,
  disabled,
}: {
  method: HTTP_METHOD;
  path: string;
  onMethodChange: (method: string) => void;
  onPathChange: (path: string) => void;
  onSendClick: () => void;
  loading: boolean;
  disabled: boolean;
}) => {
  return (
    <div className={"flex w-full gap-3"}>
      <Select
        aria-label="Select method"
        className={`w-1/5 min-w-[100px]`}
        placeholder={"Method"}
        selectedKeys={[method]}
        disallowEmptySelection
        onChange={(e) => onMethodChange(e.target.value as string)}
        classNames={{
          value: `text-${methodColor(
            method
          )} group-data-[has-value=true]:text-${methodColor(method)}`,
        }}
      >
        {Object.keys(HTTP_METHOD).map((method) => (
          <SelectItem
            key={method}
            value={method}
            className={`text-${methodColor(
              method as HTTP_METHOD
            )} data-[selectable=true]:focus:text-${methodColor(
              method as HTTP_METHOD
            )}`}
          >
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
      <Button
        color={"primary"}
        onClick={onSendClick}
        isLoading={loading}
        isDisabled={disabled}
      >
        Send
      </Button>
    </div>
  );
};

export default MethodAndPathSelector;
