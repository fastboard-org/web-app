import Option from "@/components/shared/Option";
import { SelectOptionProperties } from "@/types/editor/form";
import { Button } from "@nextui-org/react";
import { Add } from "iconsax-react";
import { v4 as uuidv4 } from "uuid";

export default function FormSelectOptionsList({
  options,
  onOptionsChange,
  onSelectOption,
}: {
  options: SelectOptionProperties[];
  onOptionsChange: (options: SelectOptionProperties[]) => void;
  onSelectOption: (index: number) => void;
}) {
  function addOption() {
    onOptionsChange(
      options.concat({
        key: uuidv4(),
        label: `New Option`,
      })
    );
  }

  function deleteOption(index: number) {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    onOptionsChange(newOptions);
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-end w-full">
        <Button
          startContent={<Add size={20} />}
          variant={"flat"}
          onPress={addOption}
        >
          Add
        </Button>
      </div>

      <ul className="flex flex-col space-y-2 w-full pt-2">
        {options.map((option, index) => (
          <Option
            key={index}
            label={option.label}
            canEditLabel={true}
            onDelete={() => deleteOption(index)}
            onLabelChange={(value) => {
              const newOptions = options.map((options, i) => {
                if (i === index) {
                  return { ...options, label: value };
                }
                return options;
              });
              onOptionsChange(newOptions);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
