import {
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
  propertiesDrawerState,
} from "@/atoms/editor";
import { ComponentType } from "@/types/editor";
import { ReactNode, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import FastboardTable, { FastboardTableProperties } from "./FastboardTable";

const FastboardComponent = ({
  onClick,
  name,
  type,
  properties,
  layoutIndex,
  containerIndex,
}: {
  onClick?: () => void;
  name: string;
  type: ComponentType;
  properties: Record<string, any>;
  layoutIndex: number;
  containerIndex: string;
}) => {
  const setIsComponentsDrawerOpen = useSetRecoilState(isComponentsDrawerOpen);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);
  const propertiesDrawerOpen = useRecoilValue(isPropertiesDrawerOpen);
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

  function getComponent(type: ComponentType, properties: Record<string, any>) {
    switch (type) {
      case ComponentType.Table:
        return (
          <FastboardTable properties={properties as FastboardTableProperties} />
        );
    }
  }

  function isSelected() {
    //TODO: only is selected if the properties drawer is open for this component
    return isHovered || propertiesDrawerOpen;
  }

  const component = getComponent(type, properties);
  if (!component) return null;

  return (
    <div
      className={`w-full ${
        isSelected()
          ? "transition border-2 border-primary box-border rounded-xl p-2 cursor-pointer"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickComponent}
    >
      {isSelected() && (
        <p className="absolute right-14 bottom-12 text-primary z-10">{name}</p>
      )}
      {component}
    </div>
  );
};

export default FastboardComponent;
