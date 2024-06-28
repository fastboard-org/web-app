import { Skeleton } from "@nextui-org/react";

const CustomSkeleton = ({
  children,
  isLoaded = false,
  className = "",
  loadingClassName = "",
  loadedClassName = "",
  onlyRenderOnLoad = false,
}: {
  children: React.ReactNode;
  isLoaded?: boolean;
  className?: string;
  loadingClassName?: string;
  loadedClassName?: string;
  onlyRenderOnLoad?: boolean;
}) => {
  const loaded = isLoaded ? " before:hidden " + loadedClassName : "";
  const loading = isLoaded ? "" : " " + loadingClassName;

  const renderItems = () => {
    if (onlyRenderOnLoad) {
      return isLoaded ? children : null;
    }
    return children;
  };

  return (
    <Skeleton
      isLoaded={isLoaded}
      className={className + loaded + loading}
      classNames={{
        content: "w-full",
      }}
    >
      {renderItems()}
    </Skeleton>
  );
};

export default CustomSkeleton;
