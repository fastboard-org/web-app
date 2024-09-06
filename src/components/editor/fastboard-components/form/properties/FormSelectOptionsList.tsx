import Option from "@/components/shared/Option";
import { SelectOptionProperties } from "@/types/editor/form";
import { Button } from "@nextui-org/react";
import { Add } from "iconsax-react";

export default function FormSelectOptionsList({
  options,
  onOptionsChange,
  onSelectOption,
}: {
  options: SelectOptionProperties[];
  onOptionsChange: (options: SelectOptionProperties[]) => void;
  onSelectOption: (index: number) => void;
}) {
  const getNextIndex = (label: string | undefined) => {
    if (!label) return 0;
    const index = label.split(" ")[1];
    return parseInt(index) + 1;
  };

  function addOption() {
    const lastOption = options[options.length - 1];
    const index = getNextIndex(lastOption?.label);
    onOptionsChange(
      options.concat({
        label: `Option ${index}`,
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
