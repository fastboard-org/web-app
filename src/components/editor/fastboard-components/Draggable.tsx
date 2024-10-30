import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const Draggable = ({
  children,
  id,
  data,
  dragSnapToOrigin,
  name,
  customClassName = "",
}: {
  children: ReactNode;
  id: string;
  data?: Object;
  dragSnapToOrigin?: boolean;
  name?: string;
  customClassName?: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: data,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={
        "flex flex-col justify-center w-[46%] gap-2 " + customClassName
      }
    >
      {children}
      <h4 className={"text-md pb-2 text-center"}>{name}</h4>
    </div>
  );
};

export default Draggable;
