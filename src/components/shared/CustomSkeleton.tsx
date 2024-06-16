import { Skeleton } from "@nextui-org/react";

const CustomSkeleton = ({
  children,
  isLoaded = false,
  className = "",
}: {
  children: React.ReactNode;
  isLoaded?: boolean;
  className?: string;
}) => {
  const before = isLoaded ? " before:hidden" : "";
  return (
    <Skeleton isLoaded={isLoaded} className={className + before}>
      {children}
    </Skeleton>
  );
};

export default CustomSkeleton;
