import { ColumnLayout as ColumnLayoutInterface } from "@/types/editor/layout-types";
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
      <div className="h-full w-1/2">
        <Container
          layoutIndex={index}
          containerIndex="component1"
          component={properties.component1}
          mode={mode}
          className="h-full py-5 pl-5 pr-1"
        />
      </div>
      <div className="h-full w-1/2">
        <Container
          layoutIndex={index}
          containerIndex="component2"
          component={properties.component2}
          mode={mode}
          className="h-full py-5 pr-5 pl-1"
        />
      </div>
    </div>
  );
}
