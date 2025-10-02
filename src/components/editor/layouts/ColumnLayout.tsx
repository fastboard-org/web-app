import { ColumnLayout as ColumnLayoutInterface } from "@/types/editor/layout-types";
import Container from "./Container";

export default function ColumnLayout({
  pageIndex,
  index,
  properties,
  mode = "editable",
}: {
  pageIndex: string;
  index: number;
  properties: ColumnLayoutInterface;
  mode?: "editable" | "view";
}) {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="h-full w-full md:w-1/2">
        <Container
          index={{
            page: pageIndex,
            layout: index,
            container: "component1",
          }}
          componentId={properties.component1}
          mode={mode}
          className="h-full py-5 md:pl-5 px-5 md:pr-1"
        />
      </div>
      <div className="h-full w-full md:w-1/2">
        <Container
          index={{
            page: pageIndex,
            layout: index,
            container: "component2",
          }}
          componentId={properties.component2}
          mode={mode}
          className="h-full py-5 px-5 md:pr-5 md:pl-1"
        />
      </div>
    </div>
  );
}
