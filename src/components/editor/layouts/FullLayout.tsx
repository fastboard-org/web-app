import {
  FastboardComponent,
  FullLayout as FullLayoutInterface,
} from "@/types/editor";
import Container from "./Container";

export default function FullLayout({
  index,
  properties,
  component1,
  mode = "editable",
}: {
  index: number;
  properties: FullLayoutInterface;
  component1?: FastboardComponent;
  mode?: "editable" | "view";
}) {
  return (
    <Container
      layoutIndex={index}
      containerIndex="component1"
      component={properties?.component1}
      mode={mode}
    />
  );
}
