import { ConnectionType } from "@/types/connections";
import { SiMongodb } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { Hierarchy3 } from "iconsax-react";

export default function ConnectionIcon({
  type,
  size,
  className,
}: {
  type: ConnectionType | null;
  size: number;
  variant?: string;
  className?: string;
}) {
  switch (type) {
    case ConnectionType.MONGO:
      return <SiMongodb size={size} className={className} />;
    case ConnectionType.SQL:
      return <BiLogoPostgresql size={size} className={className} />;
    case ConnectionType.REST:
      return <Hierarchy3 size={size} className={className} variant={"Bold"} />;
    default:
      return null;
  }
}
