import {
  FastboardComponent,
  RowLayout as RowLayoutInterface,
} from "@/types/editor";
import Container from "./Container";

export default function RowLayout({
  index,
  properties,
  component1,
  component2,
  mode = "editable",
}: {
  index: number;
  properties: RowLayoutInterface;
  component1?: FastboardComponent;
  component2?: FastboardComponent;
  mode?: "editable" | "view";
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <Container
        layoutIndex={index}
        containerIndex="component1"
        component={properties?.component1}
        mode={mode}
      />
      <Container
        layoutIndex={index}
        containerIndex="component2"
        component={properties?.component2}
        mode={mode}
      />
    </div>
  );
}
