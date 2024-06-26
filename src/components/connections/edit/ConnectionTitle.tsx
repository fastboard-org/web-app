import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ConnectionTitle = ({
  title,
  loading,
  onSave,
}: {
  title: string;
  loading: boolean;
  onSave: (title: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(title);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    setName(title);
  }, [title]);

  const showButton = name !== title && name !== "";

  const handleSave = () => {
    setSaveLoading(true);
    setTimeout(() => {
      // TODO: Save connection name
      onSave(name);
      setSaveLoading(false);
    }, 1000);
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    size={"sm"}
                    color={"primary"}
                    variant={"flat"}
                    onClick={handleSave}
                    isLoading={saveLoading}
                  >
                    Save
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CustomSkeleton>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default ConnectionTitle;
