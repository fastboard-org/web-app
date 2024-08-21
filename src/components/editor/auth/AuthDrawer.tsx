import { isAuthDrawerOpen, previewAccessTokenState } from "@/atoms/editor";
import {
  Accordion,
  AccordionItem,
  Divider,
  Input,
  Switch,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useDashboard from "@/hooks/dashboards/useDashboard";
import QuerySelection from "@/components/editor/QuerySelection";
//TODO: refactor FormDataKeySelection into a shared component
import FormDataKeySelection from "@/components/editor/fastboard-components/form/properties/FormDataKeySelection";
import scrollbarStyles from "@/styles/scrollbar.module.css";

const AuthDrawer = () => {
  const { dashboard, updateDashboard } = useDashboard();

  const setPreviewAccessToken = useSetRecoilState(previewAccessTokenState);

  const {
    enabled,
    loginQuery,
    accessTokenField,
    passwordInputLabel,
    userInputLabel,
    userQueryParameter,
    passwordQueryParameter,
    previewAccessToken,
  } = dashboard?.metadata?.auth || {};

  const isOpen = useRecoilValue(isAuthDrawerOpen);

  const updateAuth = (auth: any) => {
    updateDashboard((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        auth: {
          ...prev.metadata.auth,
          ...auth,
        },
      },
    }));
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 left-0 z-10 p-5 overflow-y-auto " +
        scrollbarStyles.scrollbar
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
            updateAuth({
              enabled: e.target.checked,
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
            <div className={"flex flex-col gap-3 mt-3"}>
              <QuerySelection
                selectedQueryId={loginQuery?.id || ""}
                onQuerySelect={(loginQuery) => {
                  updateAuth({
                    loginQuery,
                  });
                }}
                label={"Login Query"}
                placeholder={"Select login query"}
                isDisabled={!enabled}
              />
              <Input
                label="Access Token Field"
                placeholder={"Example: access_token"}
                labelPlacement="outside"
                value={accessTokenField || ""}
                onValueChange={(value) => {
                  updateAuth({
                    accessTokenField: value,
                  });
                }}
                isDisabled={!enabled}
              />
              <Input
                label="Preview Access Token"
                placeholder={"Access token used in editor queries"}
                labelPlacement="outside"
                value={previewAccessToken || ""}
                onValueChange={(value) => {
                  setPreviewAccessToken(value);
                  updateAuth({
                    previewAccessToken: value,
                  });
                }}
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
                value={userInputLabel || ""}
                onValueChange={(value) => {
                  updateAuth({
                    userInputLabel: value,
                  });
                }}
                isDisabled={!enabled}
              />
              <FormDataKeySelection
                queryId={loginQuery?.id || ""}
                selectedKey={userQueryParameter || ""}
                onSelectionChange={(value) => {
                  updateAuth({
                    userQueryParameter: value,
                  });
                }}
                label={"User Query Parameter"}
                disabledKeys={[passwordQueryParameter || ""]}
                isDisabled={!enabled}
              />
              <Input
                label="Password Input Label"
                placeholder={"Enter a label"}
                labelPlacement="outside"
                value={passwordInputLabel || ""}
                onValueChange={(value) => {
                  updateAuth({
                    passwordInputLabel: value,
                  });
                }}
                isDisabled={!enabled}
              />
              <FormDataKeySelection
                queryId={loginQuery?.id || ""}
                selectedKey={passwordQueryParameter || ""}
                onSelectionChange={(value) => {
                  updateAuth({
                    passwordQueryParameter: value,
                  });
                }}
                label={"Password Query Parameter"}
                disabledKeys={[userQueryParameter || ""]}
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
