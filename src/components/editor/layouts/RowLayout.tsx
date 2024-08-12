import { RowLayout as RowLayoutInterface } from "@/types/editor/layout-types";
import Container from "./Container";

export default function RowLayout({
  index,
  properties,
  mode = "editable",
}: {
  index: number;
  properties: RowLayoutInterface;
  mode?: "editable" | "view";
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <Container
        layoutIndex={index}
        containerIndex="component1"
        componentId={properties.component1}
        mode={mode}
        className="px-5 pt-5 pb-2 h-1/2"
      />
      <Container
        layoutIndex={index}
        containerIndex="component2"
        componentId={properties.component2}
        mode={mode}
        className="px-5 pt-1 pb-5 h-1/2"
      />
    </div>
  );
}
