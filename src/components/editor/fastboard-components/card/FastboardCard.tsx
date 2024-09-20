import { ComponentId, ComponentType } from "@/types/editor";
import {
  CardComponentProperties,
  CardComponentType,
  CardProperties,
  ImageComponentProperties,
  TextComponentProperties,
} from "@/types/editor/card-types";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
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

export default function FastboardCard({
  id,
  properties,
}: {
  id: ComponentId;
  properties: CardProperties;
}) {
  const { sourceQueryData, queryParameters, components, showShadow } =
    properties;
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
  } = useData(
    `${ComponentType.Card}-${id}`,
    sourceQueryData,
    traducedQueryParameters
  );
  const setPropertiesState = useSetRecoilState(propertiesDrawerState);

  useEffect(() => {
    console.log("keys updated", keys);
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

  if (dataFetching) {
    return <Spinner className="w-full h-full" />;
  }

  if (isDataError) {
    return (
      <p className="flex justify-center items-center w-full h-full text-danger">
        Error: {dataError?.message}
      </p>
    );
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
      default:
        return <p>Component not found</p>;
    }
  }

  return isValidData(data) ? (
    <Card className={`grow-0 h-full ${!showShadow ? "shadow-none" : ""}`}>
      <CardHeader></CardHeader>
      <CardBody
        className={"flex flex-col gap-y-2 " + scrollbarStyles.scrollbar}
      >
        {components.length === 0 && (
          <h2 className="flex w-full h-full justify-center items-center">
            Add components
          </h2>
        )}
        {components.map((component) => renderComponent(component, data))}
      </CardBody>
    </Card>
  ) : (
    <p className="flex justify-center items-center w-full h-full text-warning">
      Seems like the data is not an object or is empty.
    </p>
  );
}
