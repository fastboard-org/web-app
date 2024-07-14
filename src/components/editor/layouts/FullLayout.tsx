import { FastboardComponent } from "@/types/editor";
import Container from "./Container";

export default function FullLayout({
  index,
  component1,
  mode = "editor",
}: {
  index: number;
  component1?: FastboardComponent;
  mode?: "editor" | "view";
}) {
  return (
    <Container
      layoutIndex={index}
      containerIndex="component1"
      component={component1}
      mode={mode}
    />
  );
}
