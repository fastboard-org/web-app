import { ColumnLayout as ColumnLayoutInterface } from "@/types/editor";
import Container from "./Container";

export default function ColumnLayout({
  index,
  properties,
  mode = "editable",
}: {
  index: number;
  properties: ColumnLayoutInterface;
  mode?: "editable" | "view";
}) {
  return (
    <div className="flex flex-row h-full w-full">
      <div className="w-1/2">
        <Container
          layoutIndex={index}
          containerIndex="component1"
          component={properties.component1}
          mode={mode}
        />
      </div>
      <div className="w-1/2">
        <Container
          layoutIndex={index}
          containerIndex="component2"
          component={properties.component2}
          mode={mode}
        />
      </div>
    </div>
  );
}
