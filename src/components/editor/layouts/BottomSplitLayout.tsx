import { BottomSplitLayout as BottomSplitLayoutInterface } from "@/types/editor/layout-types";
import Container from "./Container";

export default function BottomSplitLayout({
  pageIndex,
  index,
  properties,
  mode = "editable",
}: {
  pageIndex: string;
  index: number;
  properties: BottomSplitLayoutInterface;
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
        className="w-full px-5 pt-5 pb-2 h-1/2"
      />
      <div className="flex flex-row w-full h-1/2">
        <div className="w-1/2">
          <Container
            index={{
              page: pageIndex,
              layout: index,
              container: "component2",
            }}
            componentId={properties.component2}
            mode={mode}
            className="pl-5 pr-1 pt-1 pb-5 h-full"
          />
        </div>
        <div className="w-1/2">
          <Container
            index={{
              page: pageIndex,
              layout: index,
              container: "component3",
            }}
            componentId={properties.component3}
            mode={mode}
            className="pr-5 pl-1 pt-1 pb-5 h-full"
          />
        </div>
      </div>
    </div>
  );
}
