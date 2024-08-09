import {
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
  isSettingsDrawerOpen,
  propertiesDrawerState,
} from "@/atoms/editor";
import { ComponentId, ComponentType, Context } from "@/types/editor";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getComponent } from "./utils";
import { Button } from "@nextui-org/react";
import { Trash } from "iconsax-react";
import useDashboard from "@/hooks/dashboards/useDashboard";

const FastboardComponent = ({
  id,
  name,
  type,
  properties,
  context,
  mode = "editable",
  canDelete = true,
  onClick,
}: {
  id: ComponentId;
  name: string;
  type: ComponentType;
  properties: Record<string, any>;
  context: Context;
  mode?: "editable" | "view";
  canDelete?: boolean;
  onClick?: () => void;
}) => {
  const { deleteComponentFromLayout } = useDashboard();
  const setIsComponentsDrawerOpen = useSetRecoilState(isComponentsDrawerOpen);
  const setIsSettingsDrawerOpen = useSetRecoilState(isSettingsDrawerOpen);
  const [propertiesDrawerOpen, setIsPropertiesDrawerOpen] = useRecoilState(
    isPropertiesDrawerOpen
  );
  const [propertiesDrawerStateValue, setPropertiesDrawerState] = useRecoilState(
    propertiesDrawerState
  );
  const [isHovered, setIsHovered] = useState(false);

  if (!context.layoutContext) return null;
  const { layoutIndex, containerIndex } = context.layoutContext;

  function onClickComponent(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsComponentsDrawerOpen(false);
    setIsSettingsDrawerOpen(false);
    setIsPropertiesDrawerOpen(true);
    setPropertiesDrawerState({
      layoutIndex: layoutIndex,
      container: containerIndex,
      selectedComponentId: id,
      type: type,
      properties: properties,
      context: context,
    });
    if (onClick) {
      onClick();
    }
  }

  function onDeleteComponent() {
    setIsPropertiesDrawerOpen(false);
    deleteComponentFromLayout(layoutIndex, containerIndex);
  }

  function isSelected() {
    if (
      propertiesDrawerOpen &&
      propertiesDrawerStateValue.selectedComponentId === id
    )
      return true;

    return isHovered;
  }

  const component = getComponent(
    layoutIndex,
    containerIndex,
    type,
    id,
    mode,
    properties
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
      {isSelected() && canDelete && (
        <Button
          isIconOnly
          className="absolute bottom-2 left-2 z-20 text-danger"
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
