import { isComponentsDrawerOpen, isPropertiesDrawerOpen } from "@/atoms/editor";
import { ReactNode, useState } from "react";
import { useSetRecoilState } from "recoil";

const FastboardComponent = ({
  children,
  onClick,
  name,
}: {
  children: ReactNode;
  onClick: () => void;
  name: string;
}) => {
  const setIsComponentsDrawerOpen = useSetRecoilState(isComponentsDrawerOpen);
  const setIsPropertiesDrawerOpen = useSetRecoilState(isPropertiesDrawerOpen);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${
        isHovered ? "border-2 border-primary rounded-xl p-2 cursor-pointer" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        setIsComponentsDrawerOpen(false);
        setIsPropertiesDrawerOpen(true);
        onClick();
      }}
    >
      {isHovered && <p className="absolute -top-5 text-primary z-10">{name}</p>}
      {children}
    </div>
  );
};

export default FastboardComponent;
