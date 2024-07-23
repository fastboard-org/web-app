import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Edit, More, Trash } from "iconsax-react";

const CardActions = ({
  onEditClick,
  onDeleteClick,
}: {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}) => {
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
            onClick={onEditClick}
          >
            Edit
          </Button>
          <Button
            className={
              "bg-transparent text-left justify-between gap-5 hover:bg-opacity-10 hover:bg-foreground"
            }
            fullWidth
            endContent={<Trash className={"text-danger"} />}
            onClick={onDeleteClick}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CardActions;
