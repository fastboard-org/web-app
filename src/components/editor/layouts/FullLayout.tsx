import { FastboardComponent } from "@/types/editor";
import Container from "./Container";

export default function FullLayout({
  index,
  component1,
}: {
  index: number;
  component1?: FastboardComponent;
}) {
  return (
    <Container
      layoutIndex={index}
      containerIndex="component1"
      component={component1}
    />
  );
}
