import { QueryParameter } from "@/types/connections";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Code,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { RiQuestionLine } from "react-icons/ri";
import { TickCircle, Trash } from "iconsax-react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { toast } from "sonner";

const QueryParametersDrawer = ({
  queryParameters,
  setQueryParameters,
  onlyTextParameters = false,
}: {
  queryParameters: QueryParameter[];
  setQueryParameters: (queryParameters: QueryParameter[]) => void;
  onlyTextParameters?: boolean;
}) => {
  const [newParameterType, setNewParameterType] = useState<"text" | "file">(
    "text"
  );
  const [newParameterName, setNewParameterName] = useState<string>("");
  const lastParamRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    if (lastParamRef.current) {
      lastParamRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
      lastParamRef.current.focus();
    }
  }, [queryParameters.length, lastParamRef, lastParamRef.current]);

  const canAddParameter = () => {
    return (
      newParameterName.trim() &&
      !queryParameters.find((p) => p.name === newParameterName)
    );
  };

  const handleAddParameter = () => {
    if (newParameterName.trim() === "token") {
      return toast.error(
        "Parameter name 'token' is reserved. Please use another name."
      );
    }
    if (canAddParameter()) {
      setQueryParameters([
        ...queryParameters,
        {
          name: newParameterName,
          type: newParameterType,
          preview: newParameterType === "text" ? "" : null,
        },
      ]);
      setNewParameterName("");
    }
  };

  const handleRemoveParameter = (index: number) => {
    const newQueryParameters = [...queryParameters];
    newQueryParameters.splice(index, 1);
    setQueryParameters(newQueryParameters);
  };

  const handleEditParameter = (index: number, value: any) => {
    setQueryParameters(
      queryParameters.map((p, i) =>
        i === index ? { ...p, preview: value } : p
      )
    );
  };

  return (
    <Card className={"w-[290px] h-full absolute right-0"}>
      <CardHeader className={"gap-2 p-5 pb-1"}>
        Preview parameters
        <Tooltip
          content={
            <div>
              Define and test query parameters here. Use{" "}
              <Code className={"text-xs"}>{"{{parameterName}}"}</Code> syntax to
              access them in your query.
            </div>
          }
          className={"p-3 w-[275px] -translate-x-[35px] text-xs"}
          placement={"bottom"}
          offset={10}
        >
          <div>
            <RiQuestionLine className={"text-foreground-500"} size={15} />
          </div>
        </Tooltip>
      </CardHeader>
      <CardBody className={"gap-4 p-3"}>
        <div
          className={
            "overflow-y-auto flex flex-col gap-4 h-[90%] pr-2 items-center pt-1 " +
            scrollbarStyles.scrollbar
          }
        >
          {queryParameters.map((parameter, index) => (
            <div key={index} className="flex flex-row gap-x-2 items-end">
              {parameter.type === "file" && (
                <Input
                  type="file"
                  label={parameter.name}
                  labelPlacement="outside"
                  onChange={(e) => {
                    handleEditParameter(index, e.target.files?.item(0));
                  }}
                  ref={
                    index === queryParameters.length - 1 ? lastParamRef : null
                  }
                  className={"w-[80%]"}
                  classNames={{
                    label: "pl-1",
                  }}
                />
              )}
              {parameter.type === "text" && (
                <Input
                  type="text"
                  label={parameter.name}
                  labelPlacement="outside"
                  placeholder={"Enter a parameter value"}
                  value={parameter.preview as string}
                  onChange={(e) => {
                    handleEditParameter(index, e.target.value);
                  }}
                  ref={
                    index === queryParameters.length - 1 ? lastParamRef : null
                  }
                  className={"w-[95%]"}
                />
              )}
              <Button
                isIconOnly
                variant={"flat"}
                onPress={() => handleRemoveParameter(index)}
              >
                <Trash size={20} />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-x-2 w-full">
          <Select
            aria-label="Select parameter type"
            defaultSelectedKeys={["text"]}
            disallowEmptySelection
            disabledKeys={onlyTextParameters ? ["file"] : []}
            selectedKeys={[newParameterType]}
            onChange={(e) => {
              setNewParameterType(e.target.value as "text" | "file");
            }}
          >
            <SelectItem key={"text"}>text</SelectItem>
            <SelectItem key={"file"}>file</SelectItem>
          </Select>
          <Input
            placeholder={"Enter a name"}
            value={newParameterName}
            onChange={(e) => setNewParameterName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddParameter();
              }
            }}
            endContent={
              canAddParameter() && (
                <TickCircle
                  className={"text-primary cursor-pointer hover:opacity-60"}
                  onClick={handleAddParameter}
                />
              )
            }
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default QueryParametersDrawer;
