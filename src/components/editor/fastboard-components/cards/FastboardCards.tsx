import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Spacer, user } from "@nextui-org/react";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import CustomCard from "./CustomCard";
import useData from "@/hooks/useData";
import { ComponentType } from "@/types/editor";
import { toast } from "sonner";
import { useRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import { updateComponentProperties } from "@/lib/editor.utils";
import useDashboard from "@/hooks/dashboards/useDashboard";

import scrollbarStyles from "@/styles/scrollbar.module.css";
import { useParams } from "next/navigation";

export default function FastboardCards({
  layoutIndex,
  container,
  properties,
}: {
  layoutIndex: number;
  container: string;
  properties: FastboardCardsProperties;
}) {
  const { id } = useParams();
  const { updateDashboard } = useDashboard(id as string);

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
    Number.MAX_VALUE
  );

  const [shouldUpdateCards, setShouldUpdateCards] = useState(false);

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
    updateDashboard((previous) => ({
      ...previous,
      metadata: updateComponentProperties(
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
        previous.metadata
      ),
    }));
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

  function mapItem(item: any) {
    return {
      header: item[properties.header],
      footer: item[properties.footer],
      body: properties.body
        .filter((field) => field.visible)
        .map((field) => {
          return {
            key: field.label,
            value: item[field.key],
          };
        }),
    };
  }

  return (
    <CustomSkeleton
      isLoaded={!dataFetching}
      onlyRenderOnLoad
      className={`w-full h-full ${scrollbarStyles.scrollbar}`}
    >
      <div
        className={`flex flex-wrap justify-between gap-2 overflow-auto h-full w-full ${scrollbarStyles.scrollbar}`}
      >
        {data.map((item: any, index: number) => (
          <CustomCard key={index} cardsPerRow={4} data={mapItem(item)} />
        ))}
      </div>
    </CustomSkeleton>
  );
}
