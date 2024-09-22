import { isAuthDrawerOpen, previewAccessTokenState } from "@/atoms/editor";
import {
  Accordion,
  AccordionItem,
  Divider,
  Input,
  semanticColors,
  Switch,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useDashboard from "@/hooks/dashboards/useDashboard";
import QuerySelection from "@/components/editor/QuerySelection";
import QueryParameterSelection from "@/components/shared/QueryParameterSelection";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { QueryType } from "@/types/connections";
import ColorPicker from "@/components/shared/ColorPicker";
import { useTheme } from "next-themes";

const AuthDrawer = () => {
  const { dashboard, updateDashboard } = useDashboard();
  const { theme } = useTheme();
  const setPreviewAccessToken = useSetRecoilState(previewAccessTokenState);

  const {
    enabled,
    loginQueryData,
    accessTokenField,
    passwordInputLabel,
    userInputLabel,
    userQueryParameter,
    passwordQueryParameter,
    previewAccessToken,
    title,
    buttonText,
    buttonColor,
    buttonTextColor,
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
          defaultExpandedKeys={["basic"]}
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
                selectedQueryId={loginQueryData?.queryId || ""}
                onQuerySelect={(loginQuery) => {
                  updateAuth({
                    loginQueryData: {
                      queryId: loginQuery.id,
                      connectionId: loginQuery.connection_id,
                      method: loginQuery.metadata.method,
                    },
                  });
                }}
                label={"Login Query"}
                placeholder={"Select login query"}
                isDisabled={!enabled}
                type={QueryType.UPDATE}
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
              <QueryParameterSelection
                queryId={loginQueryData?.queryId || ""}
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
              <QueryParameterSelection
                queryId={loginQueryData?.queryId || ""}
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
          <AccordionItem
            key={"customization"}
            title="Customization"
            className="pb-5 pt-3"
            classNames={{
              title: "font-medium",
            }}
          >
            <div className="flex flex-col gap-4 mt-3">
              <Input
                label="Title"
                placeholder={"Enter a title"}
                labelPlacement="outside"
                value={title || ""}
                onValueChange={(value) => {
                  updateAuth({
                    title: value,
                  });
                }}
                isDisabled={!enabled}
              />
              <Input
                label="Button Text"
                placeholder={"Enter a button text"}
                labelPlacement="outside"
                value={buttonText || ""}
                onValueChange={(value) => {
                  updateAuth({
                    buttonText: value,
                  });
                }}
                isDisabled={!enabled}
              />
            </div>
          </AccordionItem>
          <AccordionItem
            key={"style"}
            title="Style"
            className="pb-5 pt-3"
            classNames={{
              title: "font-medium",
            }}
          >
            <div className="flex flex-col gap-y-2">
              <ColorPicker
                label="Button color"
                initialColor={
                  theme === "light" ? buttonColor?.light : buttonColor?.dark
                }
                onColorChange={(color) => {
                  if (theme === "light") {
                    updateAuth({
                      buttonColor: {
                        light: color,
                        dark: buttonColor?.dark,
                      },
                    });
                  } else {
                    updateAuth({
                      buttonColor: {
                        light: buttonColor?.light,
                        dark: color,
                      },
                    });
                  }
                }}
              />
              <ColorPicker
                label="Button text"
                initialColor={
                  theme === "light"
                    ? buttonTextColor?.light
                    : buttonTextColor?.dark
                }
                onColorChange={(color) => {
                  if (theme === "light") {
                    updateAuth({
                      buttonTextColor: {
                        light: color,
                        dark: buttonTextColor?.dark,
                      },
                    });
                  } else {
                    updateAuth({
                      buttonTextColor: {
                        light: buttonTextColor?.light,
                        dark: color,
                      },
                    });
                  }
                }}
              />
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  );
};

export default AuthDrawer;
