import { Skeleton } from "@nextui-org/react";

const CustomSkeleton = ({
  children,
  isLoaded = false,
  className = "",
  loadingClassName = "",
  loadedClassName = "",
}: {
  children: React.ReactNode;
  isLoaded?: boolean;
  className?: string;
  loadingClassName?: string;
  loadedClassName?: string;
}) => {
  const loaded = isLoaded ? " before:hidden " + loadedClassName : "";
  const loading = isLoaded ? "" : " " + loadingClassName;

  return (
    <Skeleton
      isLoaded={isLoaded}
      className={className + loaded + loading}
      classNames={{
        content: "w-full",
      }}
    >
      {children}
    </Skeleton>
  );
};

export default CustomSkeleton;
