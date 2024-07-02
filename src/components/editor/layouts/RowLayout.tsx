import { FastboardComponent } from "@/types/editor";
import Container from "./Container";

export default function RowLayout({
  index,
  component1,
  component2,
}: {
  index: number;
  component1?: FastboardComponent;
  component2?: FastboardComponent;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <Container
        layoutIndex={index}
        containerIndex="component1"
        component={component1}
      />
      <Container
        layoutIndex={index}
        containerIndex="component2"
        component={component2}
      />
    </div>
  );
}
