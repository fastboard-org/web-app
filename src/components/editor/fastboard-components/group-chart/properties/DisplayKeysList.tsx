import { DisplayKey } from "@/types/editor/group-chart-types";
import { Button, Input } from "@nextui-org/react";
import { Plus, Trash2 } from "lucide-react";
import KeySelect from "../../shared/KeySelect";
import ColorPicker from "@/components/shared/ColorPicker";
import { useTheme } from "next-themes";
import { Color } from "@/types/editor/style-types";

const DisplayKeysList = ({
  displayKeys,
  availableKeys,
  onChange,
}: {
  displayKeys: DisplayKey[];
  availableKeys: string[];
  onChange: (displayKeys: DisplayKey[]) => void;
}) => {
  const { theme } = useTheme();

  const handleAddDisplayKey = () => {
    onChange([
      ...displayKeys,
      {
        key: "",
        label: "",
        color: Color.primary(),
      },
    ]);
  };

  const handleRemoveDisplayKey = (index: number) => {
    onChange(displayKeys.filter((_, i) => i !== index));
  };

  const handleUpdateDisplayKey = (index: number, updates: Partial<DisplayKey>) => {
    const updated = [...displayKeys];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p className="text-small font-medium">Display Keys</p>
        <Button
          size="sm"
          color="primary"
          variant="flat"
          startContent={<Plus size={16} />}
          onPress={handleAddDisplayKey}
        >
          Add Bar
        </Button>
      </div>

      {displayKeys.length === 0 && (
        <p className="text-small text-default-400 text-center py-2">
          No display keys added yet. Add one to create multiple bars.
        </p>
      )}

      {displayKeys.map((displayKey, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 p-3 border border-default-200 rounded-lg"
        >
          <div className="flex justify-between items-center mb-1">
            <p className="text-small font-medium">Bar {index + 1}</p>
            <Button
              size="sm"
              color="danger"
              variant="light"
              isIconOnly
              onPress={() => handleRemoveDisplayKey(index)}
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <KeySelect
            keys={availableKeys}
            onChange={(key) => {
              handleUpdateDisplayKey(index, { key });
            }}
            selectedKey={displayKey.key}
            label="Data Key"
            placeholder="Select a data key"
            emptyContent="Select a query to see available keys"
          />

          <Input
            label="Label"
            labelPlacement="outside"
            placeholder="Enter a label for this bar"
            value={displayKey.label}
            onValueChange={(value) => {
              handleUpdateDisplayKey(index, { label: value });
            }}
            size="sm"
          />

          <ColorPicker
            label="Color"
            initialColor={
              displayKey.color
                ? theme === "light"
                  ? displayKey.color.light
                  : displayKey.color.dark
                : "#3b82f6"
            }
            onColorChange={(color) => {
              const currentColor = displayKey.color || Color.primary();
              if (theme === "light") {
                handleUpdateDisplayKey(index, {
                  color: { ...currentColor, light: color },
                });
              } else {
                handleUpdateDisplayKey(index, {
                  color: { ...currentColor, dark: color },
                });
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayKeysList;
