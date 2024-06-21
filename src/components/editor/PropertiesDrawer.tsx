"use client";
import {
  dashboardMetadataState,
  isPropertiesDrawerOpen,
  propertiesDrawerState,
} from "@/atoms/editor";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import FastboardTablePropertiesComponent from "./fastboard-components/FastboardTableProperties";
import { FastboardTableProperties } from "./fastboard-components/FastboardTable";

export default function PropertiesDrawer() {
  const isOpen = useRecoilValue(isPropertiesDrawerOpen);
  const propertiesDrawerComponent = useRecoilValue(propertiesDrawerState);
  const setPropertiesDrawerState = useSetRecoilState(propertiesDrawerState);
  const setDashboardMetadata = useSetRecoilState(dashboardMetadataState);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ ease: "easeInOut" }}
      className={
        "h-full w-[22%] bg-background shadow-lg absolute top-0 right-0"
      }
    >
      <h3 className={"text-xl font-semibold p-5"}>Properties</h3>
      <Divider />
      {propertiesDrawerComponent && (
        <FastboardTablePropertiesComponent
          properties={
            propertiesDrawerComponent.properties as FastboardTableProperties
          }
          onValueChange={(properties) => {
            setPropertiesDrawerState((prev) => ({
              ...prev,
              properties: properties,
            }));
            setDashboardMetadata((prev) => ({
              layouts: prev.layouts.map((layout, index) => {
                if (index === propertiesDrawerComponent.layoutIndex) {
                  return {
                    ...layout,
                    [propertiesDrawerComponent.container]: {
                      ...layout.component1,
                      properties: properties,
                    },
                  };
                }
                return layout;
              }),
            }));
          }}
        />
      )}
    </motion.div>
  );
}
