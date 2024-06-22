import { Checkbox, Spacer } from "@nextui-org/react";
import { FastboardTableProperties } from "./FastboardTable";

const FastboardTablePropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) => {
  const { hideHeader, isStriped } = properties;

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        isSelected={hideHeader}
        onValueChange={(isSelected) => {
          onValueChange({
            hideHeader: isSelected,
            isStriped: isStriped,
          });
        }}
      >
        Hide Header
      </Checkbox>
      <Checkbox
        isSelected={isStriped}
        onValueChange={(isSelected) => {
          onValueChange({
            hideHeader: hideHeader,
            isStriped: isSelected,
          });
        }}
      >
        Stripped
      </Checkbox>
    </div>
  );
};

export default FastboardTablePropertiesComponent;
