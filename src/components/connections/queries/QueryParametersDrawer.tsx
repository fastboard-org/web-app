import { QueryParameter } from "@/types/connections";
import {
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
import { TickCircle } from "iconsax-react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { IoIosClose } from "react-icons/io";

const QueryParametersDrawer = ({
  queryParameters,
  setQueryParameters,
}: {
  queryParameters: QueryParameter[];
  setQueryParameters: (queryParameters: QueryParameter[]) => void;
}) => {
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
  }, [
    queryParameters,
    queryParameters.length,
    lastParamRef,
    lastParamRef.current,
  ]);

  const canAddParameter = () => {
    return (
      newParameterName.trim() &&
      !queryParameters.find((p) => p.name === newParameterName)
    );
  };

  const handleAddParameter = () => {
    if (canAddParameter()) {
      setQueryParameters([
        ...queryParameters,
        { name: newParameterName, preview: "" },
      ]);
      setNewParameterName("");
    }
  };

  const handleRemoveParameter = (index: number) => {
    const newQueryParameters = [...queryParameters];
    newQueryParameters.splice(index, 1);
    setQueryParameters(newQueryParameters);
  };

  return (
    <Card className={"w-[300px] h-full"}>
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
            <Input
              key={index}
              label={parameter.name}
              placeholder={"Enter a parameter value"}
              value={parameter.preview}
              onChange={(e) => {
                const newQueryParameters = [...queryParameters];
                newQueryParameters[index].preview = e.target.value;
                setQueryParameters(newQueryParameters);
              }}
              ref={index === queryParameters.length - 1 ? lastParamRef : null}
              className={"w-[95%]"}
              endContent={
                <IoIosClose
                  onClick={() => handleRemoveParameter(index)}
                  className={
                    "absolute right-2 top-2 cursor-pointer text-foreground-600 hover:opacity-60"
                  }
                />
              }
            />
          ))}
        </div>
        <Input
          placeholder={"Enter a parameter name"}
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
      </CardBody>
    </Card>
  );
};

export default QueryParametersDrawer;
