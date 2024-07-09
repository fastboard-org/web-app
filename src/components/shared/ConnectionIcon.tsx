import { ConnectionType } from "@/types/connections";
import { SiMongodb } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { Hierarchy3 } from "iconsax-react";

export default function ConnectionIcon({
  type,
  size,
  className,
}: {
  type: ConnectionType;
  size: number;
  variant?: string;
  className?: string;
}) {
  const connectionIcons = {
    [ConnectionType.MONGO]: <SiMongodb size={size} className={className} />,
    [ConnectionType.SQL]: (
      <BiLogoPostgresql size={size} className={className} />
    ),
    [ConnectionType.REST]: (
      <Hierarchy3 size={size} className={className} variant={"Bold"} />
    ),
  };

  return connectionIcons[type];
}
