"use client";
import { useParams, useRouter } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs, Input } from "@nextui-org/react";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import useConnection from "@/hooks/useConnection";
import { useEffect, useRef } from "react";

export default function Connections() {
  const { id } = useParams();
  const router = useRouter();
  const { connection, loading, editConnectionName } = useConnection(
    id as string,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !connection) {
      router.push("/home/connections");
    }
  }, [loading, connection]);

  return (
    <section className={"w-full h-full"}>
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
          className={"flex-1"}
          classNames={{
            item: "flex-1",
          }}
        >
          <CustomSkeleton
            className={
              "flex rounded-full min-w-[300px] bg-transparent dark:bg-transparent"
            }
            loadingClassName={"h-8 w-[300px]"}
            isLoaded={!loading}
          >
            <input
              ref={inputRef}
              placeholder={"Connection name"}
              className={
                "dark:text-white bg-transparent dark:bg-transparent text-[40px] focus:outline-none w-full"
              }
              value={connection?.name}
              onChange={(e) => editConnectionName(e.target.value)}
            />
          </CustomSkeleton>
        </BreadcrumbItem>
      </Breadcrumbs>
    </section>
  );
}
