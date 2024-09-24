import { ComponentId, ComponentType } from "@/types/editor";
import {
  CardComponentProperties,
  CardComponentType,
  CardProperties,
  ImageComponentProperties,
  LinkComponentProperties,
  SpacerComponentProperties,
  TextComponentProperties,
  VideoComponentProperties,
} from "@/types/editor/card-types";
import { Spinner } from "@nextui-org/react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import useData from "@/hooks/useData";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import useNavigation from "@/hooks/useNavigation";
import { useSetRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import useDashboard from "@/hooks/dashboards/useDashboard";
import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";
import LinkComponent from "./LinkComponent";
import SpacerComponent from "./SpacerComponent";
import { useTheme } from "next-themes";

export default function FastboardCard({
  id,
  properties,
}: {
  id: ComponentId;
  properties: CardProperties;
}) {
  const { theme } = useTheme();
  const {
    sourceQueryData,
    queryParameters,
    components,
    spacing,
    showShadow,
    backgroundColor,
  } = properties;
  const { updateComponentProperties } = useDashboard();
  const { getQueryParam } = useNavigation();
  const traducedQueryParameters = useMemo(() => {
    if (!queryParameters) return {};

    return Object.entries(queryParameters).reduce((acc, parameter) => {
      // Test if the value of the parametes has the synstax {{URL.queryValue}}
      const pattern = /\{\{\s*URL\.([^\s]+)\s*\}\}/;
      const match = parameter[1].match(pattern);
      if (match) {
        const queryValue = getQueryParam(match[1]);
        return { ...acc, [parameter[0]]: queryValue };
      }
      return { ...acc, [parameter[0]]: parameter[1] };
    }, {});
  }, [queryParameters]);
  const {
    data,
    keys,
    isFetching: dataFetching,
    isError: isDataError,
    error: dataError,
    refetch,
  } = useData(
    `${ComponentType.Card}-${id}`,
    sourceQueryData,
    traducedQueryParameters
  );
  const setPropertiesState = useSetRecoilState(propertiesDrawerState);

  useEffect(() => {
    updateComponentProperties(id, {
      ...properties,
      dataKeys: keys,
    });
    setPropertiesState((previous) => {
      if (previous.selectedComponentId !== id) {
        return previous;
      }
      return {
        ...previous,
        properties: {
          ...previous.properties,
          dataKeys: keys,
        },
      };
    });
  }, [keys]);

  useEffect(() => {
    refetch();
  }, [queryParameters]);

  useEffect(() => {
    if (isDataError) {
      toast.error(dataError?.message);
    }
  }, [isDataError]);

  function isValidData(data: any[]) {
    if (data.length > 1) {
      return false;
    }
    if (data.length === 0) {
      return false;
    }
    return typeof data[0] === "object";
  }

  function renderComponent(component: CardComponentProperties, data: any[]) {
    const item = data[0];

    switch (component.type) {
      case CardComponentType.Text: {
        return (
          <TextComponent
            properties={component as TextComponentProperties}
            item={item}
          />
        );
      }
      case CardComponentType.Image:
        return (
          <ImageComponent
            properties={component as ImageComponentProperties}
            item={item}
          />
        );
      case CardComponentType.Link:
        return (
          <LinkComponent
            properties={component as LinkComponentProperties}
            item={item}
          />
        );
      case CardComponentType.Video:
        return (
          <VideoComponent
            properties={component as VideoComponentProperties}
            item={item}
          />
        );
      case CardComponentType.Spacer:
        return (
          <SpacerComponent
            properties={component as SpacerComponentProperties}
            item={item}
          />
        );
      default:
        return <p>Component not found</p>;
    }
  }

  return (
    <div
      className={
        "flex grow-0 h-full w-full p-5 rounded-xl overflow-auto " +
        (showShadow ? "border dark:border-content2 shadow-xl " : " ") +
        scrollbarStyles.scrollbar
      }
      style={{
        backgroundColor:
          theme === "dark" ? backgroundColor.dark : backgroundColor.light,
      }}
    >
      {dataFetching && <Spinner className="w-full h-full" />}
      {!dataFetching && isDataError && (
        <p className="flex justify-center items-center w-full h-full text-danger">
          {dataError?.message}
        </p>
      )}

      {!dataFetching && !isDataError && (
        <>
          {!sourceQueryData && (
            <h2 className="flex w-full h-full justify-center items-center">
              Nothing to show. There is no query selected
            </h2>
          )}
          {sourceQueryData && isValidData(data) && (
            <>
              {components.length === 0 && (
                <h2 className="flex w-full h-full justify-center items-center">
                  Add components
                </h2>
              )}

              {components.length > 0 && (
                <div className="h-full w-full">
                  {components.map((component) =>
                    renderComponent(component, data)
                  )}
                </div>
              )}
            </>
          )}
          {sourceQueryData && !isValidData(data) && (
            <p className="flex justify-center items-center w-full h-full text-warning">
              Seems like the data is not an object or is empty.
            </p>
          )}
        </>
      )}
    </div>
  );
}
