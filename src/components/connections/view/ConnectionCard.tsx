import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Connection, ConnectionType } from "@/types/connections";
import { SiMongodb } from "react-icons/si";
import { Hierarchy3 } from "iconsax-react";
import CardActions from "@/components/shared/CardActions";
import { BiLogoPostgresql } from "react-icons/bi";

const connectionIcons = {
  [ConnectionType.MONGO]: (
    <SiMongodb size={38} className={"text-primary mt-2 w-[15%]"} />
  ),
  [ConnectionType.SQL]: (
    <BiLogoPostgresql size={45} className={"text-primary mt-1 w-[15%]"} />
  ),
  [ConnectionType.REST]: (
    <Hierarchy3
      size={38}
      className={"text-primary mt-2 w-[15%]"}
      variant={"Bold"}
    />
  ),
};

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
        {connectionIcons[connection.type]}
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
