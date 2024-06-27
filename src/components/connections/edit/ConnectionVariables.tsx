import { Button, Input } from "@nextui-org/react";
import { Add, ArrowRight, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VariableRow = ({
  name,
  value,
  button,
  onNameChange = () => {},
  onValueChange = () => {},
  isError = false,
}: {
  name: string;
  value: string;
  button: React.ReactNode;
  onNameChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  isError?: boolean;
}) => {
  return (
    <div className={"flex items-center gap-4 w-full"}>
      <Input
        size={"lg"}
        className={"w-full"}
        classNames={{
          inputWrapper: isError ? "border-2 border-danger" : "",
        }}
        placeholder={"variable_name"}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <ArrowRight size={30} className={"text-foreground-400"} />
      <Input
        size={"lg"}
        className={"w-full"}
        placeholder={"variable_value"}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
      {button}
    </div>
  );
};

const ConnectionVariables = ({
  entries,
  onChange,
}: {
  entries: [string, string][];
  onChange: (entries: [string, string][]) => void;
}) => {
  const [newVariable, setNewVariable] = useState({ name: "", value: "" });

  const isDuplicate = (name: string) => entries.some(([key]) => key === name);
  const isInvalid = (name: string, value: string) =>
    name === "" || isDuplicate(name) || value === "";

  return (
    <div className={"w-auto mt-[35px]"}>
      <div className={"flex items-center gap-4 mb-[35px]"}>
        <h4 className={"text-2xl font-medium"}>Variables</h4>
      </div>
      <div className={"flex flex-col gap-5"}>
        {entries.map(([key, value], index) => (
          <VariableRow
            key={index}
            name={key}
            value={value as string}
            onNameChange={(value) => {
              const newEntries = [...entries];
              newEntries[index] = [value, newEntries[index][1]];
              onChange(newEntries);
            }}
            onValueChange={(value) => {
              const newEntries = [...entries];
              newEntries[index] = [newEntries[index][0], value];
              onChange(newEntries);
            }}
            button={
              <Button
                onClick={() => {
                  onChange(entries.filter((_, i) => i !== index));
                }}
                isIconOnly
                color={"danger"}
                variant={"flat"}
              >
                <Trash size={20} />
              </Button>
            }
          />
        ))}
        <VariableRow
          name={newVariable.name}
          value={newVariable.value}
          onNameChange={(value) =>
            setNewVariable((prev) => ({ ...prev, name: value }))
          }
          onValueChange={(value) =>
            setNewVariable((prev) => ({ ...prev, value: value }))
          }
          isError={isDuplicate(newVariable.name)}
          button={
            <Button
              onClick={() => {
                onChange([...entries, [newVariable.name, newVariable.value]]);
                setNewVariable({ name: "", value: "" });
              }}
              isDisabled={isInvalid(newVariable.name, newVariable.value)}
              isIconOnly
              color={"primary"}
            >
              <Add size={20} />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default ConnectionVariables;
