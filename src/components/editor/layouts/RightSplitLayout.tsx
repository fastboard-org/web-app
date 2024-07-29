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
        <div className="flex flex-row h-full w-full">
            <Container
                layoutIndex={index}
                containerIndex="component1"
                component={properties.component1}
                mode={mode}
            />
            <div className="flex flex-col w-full">
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
