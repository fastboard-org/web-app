import { AddRowFormProperties } from "@/types/editor/table-types";
import { Button } from "@nextui-org/react";
import { useSetRecoilState } from "recoil";
import { editorModalState } from "@/atoms/editor";
import useDashboard from "@/hooks/dashboards/useDashboard";

export default function AddRowForm({
  properties,
}: {
  properties: AddRowFormProperties;
}) {
  const { dashboard } = useDashboard();
  const { buttonLabel, modalId, buttonColor } = properties;
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
        style={{ backgroundColor: buttonColor }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
