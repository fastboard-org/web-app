import { BottomSplitLayout as BottomSplitLayoutInterface } from "@/types/editor";
import Container from "./Container";

export default function BottomSplitLayout({
  index,
  properties,
  mode = "editable",
}: {
  index: number;
  properties: BottomSplitLayoutInterface;
  mode?: "editable" | "view";
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <Container
        layoutIndex={index}
        containerIndex="component1"
        component={properties.component1}
        mode={mode}
        className="px-5 pt-5 pb-2 h-1/2"
      />
      <div className="flex flex-row h-1/2">
        <div className="w-1/2">
          <Container
            layoutIndex={index}
            containerIndex="component2"
            component={properties.component2}
            mode={mode}
            className="pl-5 pr-1 pt-1 pb-5 h-full"
          />
        </div>
        <div className="w-1/2">
          <Container
            layoutIndex={index}
            containerIndex="component3"
            component={properties.component3}
            mode={mode}
            className="pr-5 pl-1 pt-1 pb-5 h-full"
          />
        </div>
      </div>
    </div>
  );
}
