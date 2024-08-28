import { useRecoilValue } from "recoil";
import {
  isAuthDrawerOpen,
  isComponentsDrawerOpen,
  isPropertiesDrawerOpen,
  isSettingsDrawerOpen,
} from "@/atoms/editor";

export const useCanvasTransform = () => {
  const isComponentsOpen = useRecoilValue(isComponentsDrawerOpen);
  const isPropertiesOpen = useRecoilValue(isPropertiesDrawerOpen);
  const isSettingsOpen = useRecoilValue(isSettingsDrawerOpen);
  const isAuthOpen = useRecoilValue(isAuthDrawerOpen);

  const moveToRight = isComponentsOpen || isSettingsOpen || isAuthOpen;
  const moveToLeft = isPropertiesOpen;

  const movePercentage = "15%";

  const x = moveToRight
    ? movePercentage
    : moveToLeft
      ? `-${movePercentage}`
      : 0;

  return {
    x,
  };
};
