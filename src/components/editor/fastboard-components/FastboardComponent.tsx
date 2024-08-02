import {
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
  propertiesDrawerState,
} from "@/atoms/editor";
import { ComponentType } from "@/types/editor";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getComponent } from "./utils";
import { Button } from "@nextui-org/react";
import { Trash } from "iconsax-react";
import { deleteComponent } from "@/lib/editor.utils";
import { useParams } from "next/navigation";
import useDashboard from "@/hooks/dashboards/useDashboard";

const FastboardComponent = ({
  onClick,
  name,
  type,
  properties,
  layoutIndex,
  containerIndex,
  mode = "editable",
}: {
  onClick?: () => void;
  name: string;
  type: ComponentType;
  properties: Record<string, any>;
  layoutIndex: number;
  containerIndex: string;
  mode?: "editable" | "view";
}) => {
  const { id } = useParams();
  const { updateDashboard } = useDashboard(id as string);
  const setIsComponentsDrawerOpen = useSetRecoilState(isComponentsDrawerOpen);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);
  const propertiesDrawerOpen = useRecoilValue(isPropertiesDrawerOpen);
  const propertiesDrawerStateValue = useRecoilValue(propertiesDrawerState);
  const setPropertiesDrawerState = useSetRecoilState(propertiesDrawerState);
  const [isHovered, setIsHovered] = useState(false);

  function onClickComponent(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsComponentsDrawerOpen(false);
    setIsPropertiesDrawerOpen(true);
    setPropertiesDrawerState({
      layoutIndex: layoutIndex,
      container: containerIndex,
      type: type,
      properties: properties,
    });
    if (onClick) {
      onClick();
    }
  }

  function onDeleteComponent() {
    setIsPropertiesDrawerOpen(false);
    updateDashboard((previous) => ({
      ...previous,
      metadata: deleteComponent(layoutIndex, containerIndex, previous.metadata),
    }));
  }

  function isSelected() {
    if (
      propertiesDrawerOpen &&
      propertiesDrawerStateValue.layoutIndex === layoutIndex &&
      propertiesDrawerStateValue.container === containerIndex
    )
      return true;

    return isHovered;
  }

  const component = getComponent(
    layoutIndex,
    containerIndex,
    type,
    mode,
    properties,
  );
  if (!component) return null;

  if (mode === "view") {
    return component;
  }

  return (
    <div
      className={`relative w-full h-full transition border-2 rounded-2xl cursor-pointer p-2 ${
        isSelected() ? "border-primary" : "border-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickComponent}
    >
      {isSelected() && (
        <p className="absolute right-4 bottom-2 text-primary z-10">{name}</p>
      )}
      {isSelected() && (
        <Button
          isIconOnly
          className="absolute bottom-2 left-2 z-10 text-danger"
          variant="light"
          onPress={onDeleteComponent}
        >
          <Trash />
        </Button>
      )}
      {component}
    </div>
  );
};

export default FastboardComponent;
