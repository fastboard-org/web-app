import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import CustomCard from "./CustomCard";
import useData from "@/hooks/useData";
import { ComponentId, ComponentType } from "@/types/editor";
import { toast } from "sonner";
import { useRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import useDashboard from "@/hooks/dashboards/useDashboard";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { HTTP_METHOD } from "@/types/connections";

export default function FastboardCards({
  id,
  properties,
}: {
  id: ComponentId;
  properties: FastboardCardsProperties;
}) {
  const { updateComponentProperties } = useDashboard();
  //TODO: change sourceQuery to type RestQueryData
  const { sourceQuery, emptyMessage, header, footer, body, cardsPerRow } =
    properties;
  const {
    data,
    keys,
    isFetching: dataFetching,
    isError: isDataError,
    error: dataError,
  } = useData(
    `${ComponentType.Cards}-${id}`,
    {
      queryId: sourceQuery?.id as string,
      connectionId: sourceQuery?.connection_id as string,
      method: sourceQuery?.metadata?.method as HTTP_METHOD,
    },
    Number.MAX_VALUE,
  );

  const [shouldUpdateCards, setShouldUpdateCards] = useState(false);

  const [propertiesState, setPropertiesState] = useRecoilState(
    propertiesDrawerState,
  );

  useEffect(() => {
    if (!sourceQuery) {
      return;
    }

    if (body.length === 0) {
      setShouldUpdateCards(true);
    }
  }, [sourceQuery]);

  useEffect(() => {
    if (!shouldUpdateCards) {
      return;
    }
    updateComponentProperties(id, {
      ...properties,
      body: keys.map((key) => {
        return {
          key: key,
          label: key,
          visible: false,
        };
      }),
    });

    setPropertiesState((previous) => {
      if (previous.selectedComponentId !== id) {
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
    const finalBody = body
      .filter((field) => field.visible)
      .map((field) => {
        return {
          key: field.label,
          value: item[field.key],
        };
      });
    return {
      header: header ? item[header] : "Header",
      footer: footer ? item[footer] : "Footer",
      body:
        finalBody.length !== 0
          ? finalBody
          : [
              { key: "key1", value: "value1" },
              { key: "key2", value: "value2" },
            ],
    };
  }

  return (
    <CustomSkeleton
      isLoaded={!dataFetching}
      onlyRenderOnLoad
      className={`w-full h-full ${scrollbarStyles.scrollbar}`}
    >
      <div
        className={`flex flex-wrap justify-between pr-2 overflow-auto h-full w-full ${scrollbarStyles.scrollbar}`}
      >
        {data.map((item: any, index: number) => (
          <CustomCard
            key={index}
            cardsPerRow={cardsPerRow || 3}
            data={mapItem(item)}
            height="320px"
          />
        ))}
      </div>
    </CustomSkeleton>
  );
}
