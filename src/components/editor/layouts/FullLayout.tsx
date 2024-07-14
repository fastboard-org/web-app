import { FullLayout as FullLayoutInterface } from "@/types/editor";
import Container from "./Container";

export default function FullLayout({
  index,
  properties,
  mode = "editable",
}: {
  index: number;
  properties: FullLayoutInterface;
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
