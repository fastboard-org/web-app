import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const Draggable = ({
  children,
  id,
  data,
  dragSnapToOrigin,
  name,
}: {
  children: ReactNode;
  id: string;
  data?: Object;
  dragSnapToOrigin?: boolean;
  name?: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: data,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div className="flex flex-col justify-center w-[46%] gap-2">
      <motion.div
        drag
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        dragSnapToOrigin={dragSnapToOrigin}
        className={"cursor-grab"}
        whileDrag={{ scale: 1.1, zIndex: 1000, cursor: "grabbing" }}
      >
        {children}
      </motion.div>
      <h4 className={"text-md pb-2 text-center"}>{name}</h4>
    </div>
  );
};

export default Draggable;
