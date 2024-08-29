import { FullLayout as FullLayoutInterface } from "@/types/editor/layout-types";
import Container from "./Container";

export default function FullLayout({
  pageIndex,
  index,
  properties,
  mode = "editable",
}: {
  pageIndex: string;
  index: number;
  properties: FullLayoutInterface;
  mode?: "editable" | "view";
}) {
  return (
    <Container
      index={{
        page: pageIndex,
        layout: index,
        container: "component1",
      }}
      componentId={properties.component1}
      mode={mode}
      className="h-full w-full p-5"
    />
  );
}
