import { FullLayout as FullLayoutInterface } from "@/types/editor/layout-types";
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
      componentId={properties.component1}
      mode={mode}
      className="h-full w-full p-5"
    />
  );
}
