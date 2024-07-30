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
        <div className="flex flex-col -space-y-12 h-full w-full">
        <Container
            layoutIndex={index}
            containerIndex="component1"
            component={properties.component1}
            mode={mode}
        />
        <div className="flex flex-row -space-x-12 h-full">
            <Container
            layoutIndex={index}
            containerIndex="component2"
            component={properties.component2}
            mode={mode}
            />
            <Container
            layoutIndex={index}
            containerIndex="component3"
            component={properties.component3}
            mode={mode}
            />
        </div>
        </div>
    );
}