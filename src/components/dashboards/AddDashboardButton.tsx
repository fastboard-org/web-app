"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Add, Element, Folder2 } from "iconsax-react";

const AddDashboardButton = ({
  onFolderClick = () => {},
  onDashboardClick = () => {},
}) => {
  return (
    <Popover placement={"bottom"}>
      <PopoverTrigger>
        <Button color={"primary"} size={"lg"} startContent={<Add />}>
          Add New
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" flex flex-col p-2 gap-1">
          <Button
            className={
              "bg-transparent text-left justify-between gap-5 hover:bg-opacity-10 hover:bg-foreground"
            }
            fullWidth
            endContent={<Folder2 className={"text-foreground-400"} />}
            onClick={onFolderClick}
          >
            Folder
          </Button>
          <Button
            className={
              "bg-transparent text-left justify-between gap-5 hover:bg-opacity-10 hover:bg-foreground"
            }
            fullWidth
            endContent={<Element className={"text-foreground-400"} />}
            onClick={onDashboardClick}
          >
            Dashboard
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddDashboardButton;
