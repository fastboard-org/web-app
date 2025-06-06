import { AddRowFormProperties } from "@/types/editor/table-types";
import { Button } from "@nextui-org/react";
import { useSetRecoilState } from "recoil";
import { editorModalState } from "@/atoms/editor";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { useTheme } from "next-themes";

export default function AddRowForm({
  properties,
}: {
  properties: AddRowFormProperties;
}) {
  const { theme } = useTheme();
  const { dashboard } = useDashboard();
  const { buttonLabel, modalId, buttonColor, buttonTextColor } = properties;
  const setEditorModalState = useSetRecoilState(editorModalState);

  if (!dashboard) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <Button
        onPress={() => {
          setEditorModalState({
            isOpen: true,
            modalId: modalId,
          });
        }}
        style={{
          backgroundColor:
            theme === "light" ? buttonColor.light : buttonColor.dark,
          color:
            theme === "light" ? buttonTextColor.light : buttonTextColor.dark,
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
