import { isAuthDrawerOpen } from "@/atoms/editor";
import {
  Accordion,
  AccordionItem,
  Divider,
  Input,
  Switch,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import useDashboard from "@/hooks/dashboards/useDashboard";
import QuerySelection from "@/components/editor/QuerySelection";

const AuthDrawer = () => {
  const { dashboard, updateDashboard } = useDashboard();

  const { enabled } = dashboard?.metadata?.auth || {};

  const isOpen = useRecoilValue(isAuthDrawerOpen);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 left-0 z-10 p-5"
      }
    >
      <h3
        className={
          "text-xl font-medium p-2 mb-2 flex w-full justify-between items-center"
        }
      >
        Authentication
        <Switch
          isSelected={enabled}
          size="sm"
          onChange={(e) => {
            updateDashboard((prev) => {
              return {
                ...prev,
                metadata: {
                  ...prev.metadata,
                  auth: {
                    ...prev.metadata.auth,
                    enabled: e.target.checked,
                  },
                },
              };
            });
          }}
        />
      </h3>
      <Divider />
      <div className="flex flex-col gap-5 mt-5">
        <Accordion
          selectionMode="multiple"
          isCompact
          fullWidth
          defaultExpandedKeys={["basic", "inputs"]}
          isDisabled={!enabled}
        >
          <AccordionItem
            key="basic"
            title="Basic"
            className="pb-5"
            classNames={{
              title: "font-medium",
            }}
          >
            <div className={"flex flex-col gap-2 mt-3"}>
              <QuerySelection
                selectedQueryId={""}
                onQuerySelect={(loginQuery) => {
                  console.log(loginQuery);
                }}
                label={"Login Query"}
                placeholder={"Select login query"}
                isDisabled={!enabled}
              />
              <Input
                label="Access Token Field"
                placeholder={"Example: access_token"}
                labelPlacement="outside"
                value={""}
                onValueChange={(value) => {}}
                isDisabled={!enabled}
              />
            </div>
          </AccordionItem>
          <AccordionItem
            key={"inputs"}
            title="Inputs"
            className="pb-5 pt-3"
            classNames={{
              title: "font-medium",
            }}
          >
            <div className="flex flex-col gap-4 mt-3">
              <Input
                label="User Input Label"
                placeholder={"Enter a label"}
                labelPlacement="outside"
                value={""}
                onValueChange={(value) => {}}
                isDisabled={!enabled}
              />
              <Input
                label="Password Input Label"
                placeholder={"Enter a label"}
                labelPlacement="outside"
                value={""}
                onValueChange={(value) => {}}
                isDisabled={!enabled}
              />
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  );
};

export default AuthDrawer;
