import { ConnectionType } from "@/types/connections";
import { Button, Tooltip } from "@nextui-org/react";
import ConnectionIcon from "@/components/shared/ConnectionIcon";

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
        <ConnectionIcon type={type} size={50} className="text-primary" />
      </Button>
    </Tooltip>
  );
};

export default ConnectionTypeButton;
