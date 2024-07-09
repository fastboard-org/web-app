import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Connection, ConnectionType } from "@/types/connections";
import CardActions from "@/components/shared/CardActions";
import ConnectionIcon from "@/components/shared/ConnectionIcon";

const connectionTexts = {
  [ConnectionType.MONGO]: "MongoDB Connection",
  [ConnectionType.SQL]: "SQL Connection",
  [ConnectionType.REST]: "API REST Connection",
};

const ConnectionCard = ({
  connection,
  onClick,
}: {
  connection: Connection;
  onClick: (connection: Connection) => void;
}) => {
  return (
    <Card
      className={"w-[300px] h-[200px] cursor-pointer"}
      isHoverable
      isPressable
      onClick={() => onClick(connection)}
    >
      <CardHeader className={"p-5 flex items-start gap-4"}>
        <ConnectionIcon
          type={connection.type}
          size={50}
          className="text-primary"
        />
        <div className={"flex flex-col w-[80%]"}>
          <h3
            className={
              "text-xl whitespace-nowrap overflow-hidden overflow-ellipsis w-full text-left"
            }
          >
            {connection.name}
          </h3>
          <p className={"opacity-50 text-left text-md"}>
            {connectionTexts[connection.type]}
          </p>
        </div>
      </CardHeader>
      <CardBody className={"flex-row-reverse justify-between items-end p-3"}>
        <CardActions />
      </CardBody>
    </Card>
  );
};

export default ConnectionCard;
