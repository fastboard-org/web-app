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

export default function FastboardCards({
  id,
  properties,
}: {
  id: ComponentId;
  properties: FastboardCardsProperties;
}) {
  const { updateComponentProperties } = useDashboard();
  const {
    sourceQuery,
    emptyMessage,
    cardsTitle,
    cardTitleField,
    cardSubtitleField,
    cardImageField,
    cardFooterField,
    cardLinkField,
    cardTooltipField,
    cardLayout,
    cardsPerRow,
    cardsHeight,
    queryFields,
  } = properties;
  const {
    data,
    keys,
    isFetching: dataFetching,
    isError: isDataError,
    error: dataError,
  } = useData(`${ComponentType.Cards}-${id}`, sourceQuery);

  const [shouldUpdateCards, setShouldUpdateCards] = useState(false);

  const [propertiesState, setPropertiesState] = useRecoilState(
    propertiesDrawerState
  );

  useEffect(() => {
    if (!sourceQuery) {
      return;
    }

    setShouldUpdateCards(true);
  }, [sourceQuery]);

  useEffect(() => {
    if (!shouldUpdateCards) {
      return;
    }
    updateComponentProperties(id, {
      ...properties,
      queryFields: keys.map((key) => {
        return {
          key,
          label: key,
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
          queryFields: keys.map((key) => {
            return {
              key,
              label: key,
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
      title: cardTitleField ? item[cardTitleField] : "",
      subtitle: cardSubtitleField ? item[cardSubtitleField] : "",
      image: cardImageField ? item[cardImageField] : null,
      footer: cardFooterField ? item[cardFooterField] : "",
      link: cardLinkField ? item[cardLinkField] : null,
      tooltip: cardTooltipField ? item[cardTooltipField] : null,
    };
  }

  return (
    <CustomSkeleton
      isLoaded={!dataFetching}
      onlyRenderOnLoad
      className={`w-full h-full ${scrollbarStyles.scrollbar}`}
    >
      <h2 className="text-[40px]">{cardsTitle}</h2>
      <div
        className={`flex flex-wrap justify-between gap-y-5 pr-2 overflow-auto h-full w-full ${scrollbarStyles.scrollbar}`}
      >
        {data.map((item: any, index: number) => (
          <CustomCard
            key={index}
            title={mapItem(item).title}
            subtitle={mapItem(item).subtitle}
            image={mapItem(item).image}
            footer={mapItem(item).footer}
            layout={cardLayout}
            cardsPerRow={cardsPerRow || 3}
            cardHeight={cardsHeight || 200}
            link={mapItem(item).link}
            tooltip={mapItem(item).tooltip}
          />
        ))}
      </div>
    </CustomSkeleton>
  );
}
