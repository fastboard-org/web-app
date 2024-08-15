import { SidebarProperties } from "@/types/editor/sidebar-types";

export default function FastboardSidebarProperties({
  properties,
  onValueChange,
}: {
  properties: SidebarProperties;
  onValueChange: (properties: SidebarProperties) => void;
}) {
  return (
    <div>
      <h1>FastboardSidebar</h1>
    </div>
  );
}
