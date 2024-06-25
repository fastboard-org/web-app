import { Skeleton } from "@nextui-org/react";

const CustomSkeleton = ({
  children,
  isLoaded = false,
  className = "",
  loadingClassName = "",
}: {
  children: React.ReactNode;
  isLoaded?: boolean;
  className?: string;
  loadingClassName?: string;
}) => {
  const loaded = isLoaded ? " before:hidden w-full" : "";
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
