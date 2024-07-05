import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Tooltip,
} from "@nextui-org/react";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { Setting2 } from "iconsax-react";
import Link from "next/link";

const ConnectionTitle = ({
  title,
  loading,
  onButtonClick,
}: {
  title: string;
  loading: boolean;
  onButtonClick?: () => void;
}) => {
  return (
    <Breadcrumbs
      itemClasses={{
        item: "text-[40px]",
        separator: "text-[40px]",
      }}
    >
      <BreadcrumbItem>
        <Link href={"/home/connections"}>Connections</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <CustomSkeleton
          className={
            "flex rounded-full min-w-[300px] bg-transparent dark:bg-transparent"
          }
          loadingClassName={"h-8 w-[300px]"}
          isLoaded={!loading}
        >
          <div className={"flex items-center gap-6"}>
            <h2 className={"text-[40px]"}>{title}</h2>
            <Tooltip content={"Settings"} placement={"bottom"} closeDelay={0}>
              <Button
                isIconOnly
                size={"md"}
                className={"bg-foreground bg-opacity-5"}
                onClick={onButtonClick}
              >
                <Setting2
                  size={20}
                  variant={"Bold"}
                  className={"text-primary"}
                />
              </Button>
            </Tooltip>
          </div>
        </CustomSkeleton>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default ConnectionTitle;
