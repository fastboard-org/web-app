import { RightSplitLayout as RightSplitLayoutInterface } from "@/types/editor/layout-types";
import Container from "./Container";

export default function RightSplitLayout({
  pageIndex,
  index,
  properties,
  mode = "editable",
}: {
  pageIndex: string;
  index: number;
  properties: RightSplitLayoutInterface;
  mode?: "editable" | "view";
}) {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="w-full md:w-1/2 h-full">
        <Container
          index={{
            page: pageIndex,
            layout: index,
            container: "component1",
          }}
          componentId={properties.component1}
          mode={mode}
          className="h-full p-5"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 h-full">
        <Container
          index={{
            page: pageIndex,
            layout: index,
            container: "component2",
          }}
          componentId={properties.component2}
          mode={mode}
          className="p-5 md:pl-1 md:pr-5 md:pt-5 md:pb-1 h-full md:h-1/2"
        />
        <Container
          index={{
            page: pageIndex,
            layout: index,
            container: "component3",
          }}
          componentId={properties.component3}
          mode={mode}
          className="p-5 md:pl-1 md:pr-5 md:pt-1 md:pb-5 h-full md:h-1/2"
        />
      </div>
    </div>
  );
}
