import { Card, CardBody, CardHeader } from "@nextui-org/react";
import CardActions from "@/components/dashboards/CardActions";

const ItemCard = ({
  name,
  icon,
  className,
  onClick,
}: {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Card
      className={"w-[300px] h-[200px] cursor-pointer  " + className}
      isHoverable
      isPressable
      onClick={onClick}
    >
      <CardHeader className={"p-5 flex gap-2"}>
        {icon}
        <h3
          className={
            "text-2xl whitespace-nowrap overflow-hidden overflow-ellipsis"
          }
        >
          {name}
        </h3>
      </CardHeader>
      <CardBody className={"flex-row-reverse justify-between items-end p-3"}>
        <CardActions />
      </CardBody>
    </Card>
  );
};

export default ItemCard;
