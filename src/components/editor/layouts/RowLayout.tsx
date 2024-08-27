import { RowLayout as RowLayoutInterface } from "@/types/editor/layout-types";
import Container from "./Container";

export default function RowLayout({
  pageIndex,
  index,
  properties,
  mode = "editable",
}: {
  pageIndex: string;
  index: number;
  properties: RowLayoutInterface;
  mode?: "editable" | "view";
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <Container
        index={{
          page: pageIndex,
          layout: index,
          container: "component1",
        }}
        componentId={properties.component1}
        mode={mode}
        className="px-5 pt-5 pb-2 h-1/2"
      />
      <Container
        index={{
          page: pageIndex,
          layout: index,
          container: "component2",
        }}
        componentId={properties.component2}
        mode={mode}
        className="px-5 pt-1 pb-5 h-1/2"
      />
    </div>
  );
}
