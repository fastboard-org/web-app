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

  function getComponent(type: ComponentType, properties: Record<string, any>) {
    switch (type) {
      case ComponentType.Table:
        return (
          <FastboardTable properties={properties as FastboardTableProperties} />
        );
    }
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

  const component = getComponent(type, properties);
  if (!component) return null;

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
      {component}
    </div>
  );
};

export default FastboardComponent;
