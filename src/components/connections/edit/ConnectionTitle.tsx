import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ConnectionTitle = ({
  title,
  loading,
  onChange,
}: {
  title: string;
  loading: boolean;
  onChange: (title: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Breadcrumbs
      itemClasses={{
        item: "text-[40px]",
        separator: "text-[40px]",
      }}
    >
      <BreadcrumbItem href={"/home/connections"}>
        <h2>Connections</h2>
      </BreadcrumbItem>
      <BreadcrumbItem
        onClick={() => inputRef.current?.focus()}
        className={"flex flex-1"}
        classNames={{
          item: "flex-1",
        }}
      >
        <CustomSkeleton
          className={
            "flex rounded-full min-w-[300px] bg-transparent dark:bg-transparent"
          }
          loadingClassName={"h-8 w-[300px]"}
          loadedClassName={"w-full"}
          isLoaded={!loading}
        >
          <div className={"flex items-center gap-4 w-full"}>
            <input
              ref={inputRef}
              placeholder={"Connection name"}
              className={
                "dark:text-white bg-transparent dark:bg-transparent text-[40px] focus:outline-none w-full"
              }
              value={title}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </CustomSkeleton>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default ConnectionTitle;
