import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Spacer } from "@nextui-org/react";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import CustomCard from "./CustomCard";
import useData from "@/hooks/useData";
import { ComponentType } from "@/types/editor";
import { toast } from "sonner";
import { useRecoilState } from "recoil";
import { dashboardMetadataState, propertiesDrawerState } from "@/atoms/editor";
import { updateComponentProperties } from "@/lib/editor.utils";

import scrollbarStyles from "@/styles/scrollbar.module.css";

export default function FastboardCards({
  layoutIndex,
  container,
  properties,
}: {
  layoutIndex: number;
  container: string;
  properties: FastboardCardsProperties;
}) {
  const { sourceQuery, emptyMessage, header, footer, body } = properties;
  const {
    data,
    keys,
    isFetching: dataFetching,
    isError: isDataError,
    error: dataError,
  } = useData(
    `${layoutIndex}-${container}-${ComponentType.Cards}`,
    sourceQuery,
    10
  );

  const [shouldUpdateCards, setShouldUpdateCards] = useState(false);
  const [dashboardMetadata, setDashboardMetadata] = useRecoilState(
    dashboardMetadataState
  );

  const [propertiesState, setPropertiesState] = useRecoilState(
    propertiesDrawerState
  );

  useEffect(() => {
    setShouldUpdateCards(true);
  }, [sourceQuery]);

  useEffect(() => {
    if (!shouldUpdateCards) {
      return;
    }
    setDashboardMetadata((previous) =>
      updateComponentProperties(
        layoutIndex,
        container,
        ComponentType.Cards,
        {
          ...properties,
          body: keys.map((key) => {
            return {
              key: key,
              label: key,
              visible: false,
            };
          }),
        },
        previous
      )
    );
    setPropertiesState((previous) => {
      if (
        previous.layoutIndex !== layoutIndex ||
        previous.container !== container
      ) {
        return previous;
      }
      return {
        ...previous,
        properties: {
          ...previous.properties,
          body: keys.map((key) => {
            return {
              key: key,
              label: key,
              visible: false,
            };
          }),
        },
      };
    });

    setShouldUpdateCards(false);
  }, [keys]);

  useEffect(() => {
    if (isDataError) {
      toast.error("Failed loading data", {
        description: dataError?.message,
      });
    }
  }, [isDataError]);

  if (isDataError) {
    return (
      <Card className="flex flex-col w-full h-[30%] p-5 justify-center items-center">
        <p className="text-xl text-danger">Failed loading data</p>
      </Card>
    );
  }

  if (!dataFetching && data.length === 0) {
    return (
      <Card className="flex flex-col w-full h-full p-5 justify-center items-center">
        <p className="text-xl text-danger">{emptyMessage}</p>
      </Card>
    );
  }
  // function that receives and item and returns a dict with
  // item["first_name"] as header, item["birth_date"] as footer
  // and mail: item["email"], gender: item["gender"] as body
  function mapItem(item: any) {
    console.log("PROPERTIES", properties);
    return {
      header: item[properties.header],
      footer: item[properties.footer],
      // iterate over body and if the item has visible true, add it to the body
      // properties.body es un array de objetos con key, label y visible
      body: properties.body
        .filter((field) => field.visible)
        .map((field) => {
          return {
            key: field.key,
            value: item[field.key],
          };
        }),
    };
  }

  return (
    <CustomSkeleton
      isLoaded={!dataFetching}
      onlyRenderOnLoad
      // className="overflow-auto w-full h-full border-4 border-red-500"
      className={`w-full h-max min-h-full border-4 border-red-500 ${scrollbarStyles.scrollbar}`}
    >
      <div
        className={`flex flex-wrap grow-0 h-fit min-h-full w-full border-4 border-yellow-500`}
      >
        {/* <div className="grid grid-cols-4 gap-4 grow-0"> */}
        {data.map((item: any, index: number) => (
          <CustomCard
            key={index}
            data={mapItem(item)}
            // className="w-1/4 h-1/2"
          />
        ))}
      </div>
    </CustomSkeleton>
  );
}
