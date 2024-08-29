import QuestionModal from "@/components/shared/QuestionModal";
import useDashboard from "@/hooks/dashboards/useDashboard";
import useNavigation from "@/hooks/useNavigation";
import { Button, Checkbox } from "@nextui-org/react";
import { Trash } from "iconsax-react";
import { useState } from "react";

export default function SidebarSettings() {
  const { dashboard, addSidebar, deleteSidebar, updateDashboard } =
    useDashboard();
  const { changePage } = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasSidebar = dashboard?.metadata?.sidebar ? true : false;
  const isVisible = dashboard?.metadata?.sidebar?.visible ?? false;

  function toggleVisibility(enabled: boolean) {
    changePage("home");
    updateDashboard((previous) => {
      if (!previous.metadata.sidebar) {
        return previous;
      }

      return {
        ...previous,
        metadata: {
          ...previous.metadata,
          sidebar: {
            ...previous.metadata.sidebar,
            visible: enabled,
          },
        },
      };
    });
  }

  return (
    <div className="flex flex-row justify-between items-center py-1 px-2 bg-content2 rounded-lg border border-content4">
      <span className="text-md">Sidebar</span>
      {hasSidebar && (
        <div className="flex flex-row items-center">
          <Checkbox isSelected={isVisible} onValueChange={toggleVisibility} />
          <Button
            isIconOnly
            variant="light"
            color="danger"
            size="sm"
            onPress={() => setIsModalOpen(true)}
          >
            <Trash />
          </Button>
        </div>
      )}

      {!hasSidebar && (
        <Button variant="light" size="sm" onPress={addSidebar}>
          Create
        </Button>
      )}

      <QuestionModal
        isOpen={isModalOpen}
        questionText="Are you sure you want to delete the sidebar"
        warningText="This action cannot be undone and will delete all pages and components except the page home."
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          deleteSidebar();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
