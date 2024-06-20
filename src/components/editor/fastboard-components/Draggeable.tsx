import { motion } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";

interface BaseDraggeableProps {
  onDrop: (elements: HTMLElement[]) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  children?: ReactNode;
}

export default function Draggable({
  onDrop,
  onDragStart = () => {},
  onDragEnd = () => {},
  children,
}: BaseDraggeableProps) {
  const [isDragging, setIsDragging] = useState(false);
  const draggableRef = useRef(null);
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [overlappedElements, setOverlappedElements] = useState<HTMLElement[]>(
    []
  );

  const isOverlapping = (
    rect1: { right: number; left: number; bottom: number; top: number },
    rect2: { left: number; right: number; top: number; bottom: number }
  ) => {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  };

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(".fastboard-container")
    ) as HTMLElement[];
    setElements(elements);
  }, []);

  const checkForOverlap = () => {
    if (!draggableRef.current) {
      return;
    }
    const currentElement = draggableRef.current as HTMLElement;
    const draggableRect = currentElement.getBoundingClientRect();
    const currentlyOverlapped = [] as HTMLElement[];
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (isOverlapping(draggableRect, rect)) {
        currentlyOverlapped.push(element);
      }
    });
    setOverlappedElements(currentlyOverlapped);
    return currentlyOverlapped;
  };

  const resetElementsBackground = () => {
    elements.forEach((el) => {
      el.style.backgroundColor = "transparent";
    });
  };

  useEffect(() => {
    elements.forEach((el) => {
      if (overlappedElements.filter((element) => element.id === el.id).length) {
        //el.style.backgroundColor = "rgba(135,207,232,0.1)";
      } else {
        //el.style.backgroundColor = "transparent";
      }
    });
  }, [overlappedElements, elements]);

  useEffect(() => {
    if (isDragging) {
      const interval = setInterval(() => {
        checkForOverlap();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  return (
    <motion.div
      ref={draggableRef}
      className={`w-10/12 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } drag-item`}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragSnapToOrigin
      dragElastic={1}
      onDragStart={() => {
        setIsDragging(true);
        onDragStart();
      }}
      onDragEnd={() => {
        if (overlappedElements.length) {
          onDrop(overlappedElements);
        }
        setIsDragging(false);
        resetElementsBackground();
        onDragEnd();
      }}
    >
      {children}
    </motion.div>
  );
}
