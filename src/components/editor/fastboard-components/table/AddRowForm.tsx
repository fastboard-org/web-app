import { AddRowFormProperties } from "@/types/editor/table-types";
import { Button } from "@nextui-org/react";
import FastboardComponent from "../FastboardComponent";
import { ComponentType } from "@/types/editor";
import { useSetRecoilState } from "recoil";
import { editorModalState } from "@/atoms/editor";
import { useParams } from "next/navigation";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { getModalFrame } from "@/lib/editor.utils";

export default function AddRowForm({
  properties,
}: {
  properties: AddRowFormProperties;
}) {
  const { id } = useParams();
  const { dashboard } = useDashboard(id as string);
  const { buttonLabel, modalId } = properties;
  const setEditorModalState = useSetRecoilState(editorModalState);

  if (!dashboard) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <Button
        color="primary"
        onPress={() => {
          const modal = getModalFrame(modalId, dashboard.metadata);
          if (!modal) {
            return;
          }
          setEditorModalState({
            isOpen: true,
            modalId: modal.id,
          });
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
