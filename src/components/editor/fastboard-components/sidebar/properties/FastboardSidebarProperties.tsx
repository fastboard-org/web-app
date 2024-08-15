import ColorPicker from "@/components/shared/ColorPicker";
import { SidebarProperties } from "@/types/editor/sidebar-types";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function FastboardSidebarProperties({
  properties,
  onValueChange,
}: {
  properties: SidebarProperties;
  onValueChange: (properties: SidebarProperties) => void;
}) {
  const [color, setColor] = useState("#aabbcc");

  return (
    <div>
      <h1>FastboardSidebar</h1>
      <ColorPicker initialColor={color} onColorChange={setColor} />
    </div>
  );
}
