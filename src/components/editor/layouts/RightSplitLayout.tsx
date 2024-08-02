import { RightSplitLayout as RightSplitLayoutInterface } from "@/types/editor";
import Container from "./Container";

export default function RightSplitLayout({
  index,
  properties,
  mode = "editable",
}: {
  index: number;
  properties: RightSplitLayoutInterface;
  mode?: "editable" | "view";
}) {
  return (
    <div className="flex flex-row h-full w-full">
      <div className="w-1/2 h-full">
        <Container
          layoutIndex={index}
          containerIndex="component1"
          component={properties.component1}
          mode={mode}
          className="p-5"
        />
      </div>
      <div className="flex flex-col w-1/2 h-full">
        <Container
          layoutIndex={index}
          containerIndex="component2"
          component={properties.component2}
          mode={mode}
          className="pl-1 pr-5 pt-5 pb-1 h-1/2"
        />
        <Container
          layoutIndex={index}
          containerIndex="component3"
          component={properties.component3}
          mode={mode}
          className="pl-1 pr-5 pt-1 pb-5 h-1/2"
        />
      </div>
    </div>
  );
}