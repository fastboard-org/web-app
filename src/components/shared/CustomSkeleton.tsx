import { Skeleton } from "@nextui-org/react";

const CustomSkeleton = ({
  children,
  isLoaded = false,
  className = "",
  onlyRenderOnLoad = false,
}: {
  children: React.ReactNode;
  isLoaded?: boolean;
  className?: string;
  onlyRenderOnLoad?: boolean;
}) => {
  const before = isLoaded ? " before:hidden" : "";

  const renderItems = () => {
    if (onlyRenderOnLoad) {
      return isLoaded ? children : null;
    }
    return children;
  };

  return (
    <Skeleton isLoaded={isLoaded} className={className + before}>
      {renderItems()}
    </Skeleton>
  );
};

export default CustomSkeleton;
