import useDashboard from "@/hooks/dashboards/useDashboard";
import { Button, Checkbox } from "@nextui-org/react";
import { Trash } from "iconsax-react";

export default function HeaderSettings() {
  const { dashboard, addHeader, deleteHeader, updateDashboard } =
    useDashboard();

  const isVisible = dashboard?.metadata.header.isVisible;
  const hasHeader = dashboard?.metadata.header.componentId ? true : false;

  function toggleVisibility(enabled: boolean) {
    updateDashboard((previous) => {
      if (!previous.metadata.header.componentId) {
        return previous;
      }

      return {
        ...previous,
        metadata: {
          ...previous.metadata,
          header: {
            ...previous.metadata.header,
            isVisible: enabled,
          },
        },
      };
    });
  }

  return (
    <div className="flex flex-row justify-between items-center py-1 px-2 bg-content2 rounded-lg border border-content4">
      <span className="text-md">Header</span>
      {hasHeader && (
        <div className="flex flex-row items-center">
          <Checkbox isSelected={isVisible} onValueChange={toggleVisibility} />
          <Button
            isIconOnly
            variant="light"
            color="danger"
            size="sm"
            onPress={() => deleteHeader()}
          >
            <Trash />
          </Button>
        </div>
      )}

      {!hasHeader && (
        <Button variant="light" size="sm" onPress={addHeader}>
          Create
        </Button>
      )}
    </div>
  );
}
