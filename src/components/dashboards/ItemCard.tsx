import { DashboardInterface } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Copy, Edit, Folder2, More, Trash } from "iconsax-react";

const Actions = () => {
  return (
    <Popover placement={"right"}>
      <PopoverTrigger>
        <More className={"cursor-pointer hover:text-foreground-500"} />
      </PopoverTrigger>
      <PopoverContent>
        <div className=" flex flex-col p-2 gap-1">
          <Button
            className={
              "bg-transparent text-left justify-between gap-5 hover:bg-opacity-10 hover:bg-foreground"
            }
            fullWidth
            endContent={<Edit className={"text-foreground-400"} />}
          >
            Edit
          </Button>
          <Button
            className={
              "bg-transparent text-left justify-between gap-5 hover:bg-opacity-10 hover:bg-foreground"
            }
            fullWidth
            endContent={<Copy className={"text-foreground-400"} />}
          >
            Duplicate
          </Button>

          <Button
            className={
              "bg-transparent text-left justify-between gap-5 hover:bg-opacity-10 hover:bg-foreground"
            }
            fullWidth
            endContent={<Trash className={"text-danger"} />}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ItemCard = ({ item }: { item: DashboardInterface  || FolderInterface}) => {
  return (
    <Card className={"w-[300px] h-[200px]"}>
      <CardHeader className={"p-5 flex gap-2"}>
        {dashboard.isFolder && <Folder2 className={"text-primary"} size={20} />}
        <h3
          className={
            "text-2xl whitespace-nowrap overflow-hidden overflow-ellipsis"
          }
        >
          {dashboard.name}
        </h3>
      </CardHeader>
      <CardBody className={"flex-row-reverse justify-between items-end p-3"}>
        <Actions />
      </CardBody>
    </Card>
  );
};

export default ItemCard;
