import { ConnectionType } from "@/types/connections";
import { Button, Tooltip } from "@nextui-org/react";
import { Hierarchy3 } from "iconsax-react";
import { SiMongodb } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

const connectionIcons = {
  [ConnectionType.MONGO]: <SiMongodb size={60} className={"text-primary"} />,
  [ConnectionType.SQL]: (
    <BiLogoPostgresql size={60} className={"text-primary"} />
  ),
  [ConnectionType.REST]: (
    <Hierarchy3 size={55} className={"text-primary"} variant={"Bold"} />
  ),
};

const connectionTexts = {
  [ConnectionType.MONGO]: "MongoDB",
  [ConnectionType.SQL]: "PostgresSQL",
  [ConnectionType.REST]: "API REST",
};

const ConnectionTypeButton = ({
  type,
  onClick,
  selected,
}: {
  type: ConnectionType;
  onClick: () => void;
  selected: boolean;
}) => {
  const selectedClassName = selected
    ? "bg-primary bg-opacity-30"
    : "bg-opacity-50";

  return (
    <Tooltip
      content={connectionTexts[type]}
      placement={"bottom"}
      closeDelay={0}
    >
      <Button
        isIconOnly
        className={"w-[120px] h-[100px] " + selectedClassName}
        onClick={onClick}
      >
        {connectionIcons[type]}
      </Button>
    </Tooltip>
  );
};

export default ConnectionTypeButton;
