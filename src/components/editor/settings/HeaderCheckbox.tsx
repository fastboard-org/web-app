import useDashboard from "@/hooks/dashboards/useDashboard";
import { Checkbox } from "@nextui-org/react";

export default function HeaderSettings({
  isSelected,
  shouldCreateHeader,
}: {
  isSelected: boolean;
  shouldCreateHeader: boolean;
}) {
  const { addHeader, switchHeaderState } = useDashboard();
  return (
    <Checkbox
      isSelected={isSelected}
      onValueChange={(isSelected) => {
        if (shouldCreateHeader) {
          addHeader();
        } else {
          switchHeaderState();
        }
      }}
    >
      Show Header
    </Checkbox>
  );
}
