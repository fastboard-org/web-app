import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";
import { motion } from "framer-motion";

const Draggable = ({
  children,
  id,
  data,
  dragSnapToOrigin,
}: {
  children: ReactNode;
  id: string;
  data?: Object;
  dragSnapToOrigin?: boolean;
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
  );
};

export default Draggable;
