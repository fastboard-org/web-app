import { RightSplitLayout as RightSplitLayoutInterface} from "@/types/editor";
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
        <div className="flex flex-row -space-x-12 h-full w-full">
            <div className="w-1/2">
                <Container
                    layoutIndex={index}
                    containerIndex="component1"
                    component={properties.component1}
                    mode={mode}
                />
            </div>
            <div className="flex flex-col w-1/2 h-full -space-y-12">
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
};