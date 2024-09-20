import QuerySelection from "@/components/editor/QuerySelection";
import {
  CardComponentProperties,
  CardComponentType,
  CardProperties,
  ImageComponentProperties,
  LinkComponentProperties,
  TextComponentProperties,
  VideoComponentProperties,
} from "@/types/editor/card-types";
import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Code,
  Input,
  Select,
  SelectItem,
  Spacer,
  Tooltip,
} from "@nextui-org/react";
import { RiQuestionLine } from "react-icons/ri";
import CardComponentsList from "./CardComponentsList";
import { useEffect, useState } from "react";
import CardTextComponentProperties from "./CardTextComponentProperties";
import { useRecoilValue } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import CardImageComponentProperties from "./CardImageComponentProperties";
import CardVideoComponentProperties from "./CardVideoComponentProperties";
import CardLinkComponentProperties from "./CardLinkComponentProperties";

export default function FastboardCardProperties({
  properties,
  onValueChange,
}: {
  properties: CardProperties;
  onValueChange: (properties: CardProperties) => void;
}) {
  const { sourceQueryData, queryParameters, components, dataKeys } = properties;
  const { selectedComponentId } = useRecoilValue(propertiesDrawerState);
  const [componentSelectedIndex, setComponentSelectedIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    // Reset selectinos when component is changed
    setComponentSelectedIndex(null);
  }, [selectedComponentId]);

  function onComponentChange(component: CardComponentProperties) {
    if (componentSelectedIndex === null) {
      return;
    }
    const newComponents = [...components];
    newComponents[componentSelectedIndex] = component;

    onValueChange({
      ...properties,
      components: newComponents,
    });
  }

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem
          key={"baseProperties"}
          onPress={() => {
            setComponentSelectedIndex(null);
          }}
        >
          Card
        </BreadcrumbItem>

        {componentSelectedIndex != null && (
          <BreadcrumbItem key={"componentProperties"}>Component</BreadcrumbItem>
        )}
      </Breadcrumbs>
      <Spacer y={4} />

      {componentSelectedIndex === null && (
        <Accordion
          selectionMode="multiple"
          isCompact
          fullWidth
          defaultExpandedKeys={["basic", "components", "style"]}
          className="p-0"
        >
          <AccordionItem
            key="basic"
            title="Basic"
            className="pb-2"
            classNames={{
              title: "font-medium",
            }}
          >
            <QuerySelection
              selectedQueryId={sourceQueryData?.queryId || ""}
              onQuerySelect={(newQuery) => {
                console.log(newQuery);
                if (newQuery.id === sourceQueryData?.queryId) {
                  return;
                }
                onValueChange({
                  ...properties,
                  sourceQueryData: {
                    queryId: newQuery.id,
                    connectionId: newQuery.connection_id,
                    method: newQuery.metadata?.method,
                  },
                  queryParameters: newQuery.metadata?.parameters?.reduce(
                    (acc: Record<string, string>, param: any) => {
                      acc[param.name] = param.preview;
                      return acc;
                    },
                    {}
                  ),
                  dataKeys: [],
                  components: components.map((component) => ({
                    ...component,
                    dataKey: "",
                  })),
                });
              }}
            />
            {sourceQueryData && queryParameters && (
              <>
                <div className="flex justify-between">
                  <h1 className="text-small">Parameters</h1>
                  <Tooltip
                    content={
                      <div>
                        Use{" "}
                        <Code className={"text-xs"}>
                          {"{{URL.queryValue}}"}
                        </Code>{" "}
                        syntax to access url query strings.
                      </div>
                    }
                    className={"p-3 w-[275px] -translate-x-[35px] text-xs"}
                    placement={"bottom"}
                    offset={10}
                    closeDelay={0}
                  >
                    <div>
                      <RiQuestionLine
                        className={"text-foreground-500"}
                        size={15}
                      />
                    </div>
                  </Tooltip>
                </div>

                <div className="flex flex-col gap-2 px-2 w-full">
                  {Object.entries(queryParameters).map((parameter, index) => (
                    <div className="flex flex-row items-center justify-between gap-x-2">
                      <h2 className="w-full text-sm">{parameter[0]}</h2>
                      <Input
                        key={index}
                        value={parameter[1]}
                        onChange={(e) => {
                          onValueChange({
                            ...properties,
                            queryParameters: {
                              ...queryParameters,
                              [parameter[0]]: e.target.value,
                            },
                          });
                        }}
                        width={"100%"}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </AccordionItem>
          <AccordionItem
            key="components"
            title="Components"
            className="pb-2"
            classNames={{
              title: "font-medium",
            }}
          >
            {!sourceQueryData && (
              <div className="flex justify-center text-sm">
                Select a query to enable components
              </div>
            )}
            {sourceQueryData && (
              <CardComponentsList
                components={components}
                onSelectComponent={(component) => {
                  setComponentSelectedIndex(components.indexOf(component));
                }}
                onChange={(newComponents) =>
                  onValueChange({ ...properties, components: newComponents })
                }
              />
            )}
          </AccordionItem>
        </Accordion>
      )}

      {componentSelectedIndex !== null &&
        components[componentSelectedIndex]?.type === CardComponentType.Text && (
          <CardTextComponentProperties
            properties={
              components[componentSelectedIndex] as TextComponentProperties
            }
            dataKeys={dataKeys}
            onValueChange={(component) => {
              onComponentChange(component);
            }}
          />
        )}
      {componentSelectedIndex !== null &&
        components[componentSelectedIndex]?.type ===
          CardComponentType.Image && (
          <CardImageComponentProperties
            properties={
              components[componentSelectedIndex] as ImageComponentProperties
            }
            dataKeys={dataKeys}
            onValueChange={(component) => {
              onComponentChange(component);
            }}
          />
        )}
      {componentSelectedIndex !== null &&
        components[componentSelectedIndex]?.type === CardComponentType.Link && (
          <CardLinkComponentProperties
            properties={
              components[componentSelectedIndex] as LinkComponentProperties
            }
            dataKeys={dataKeys}
            onValueChange={(component) => {
              onComponentChange(component);
            }}
          />
        )}
      {componentSelectedIndex !== null &&
        components[componentSelectedIndex]?.type ===
          CardComponentType.Video && (
          <CardVideoComponentProperties
            properties={
              components[componentSelectedIndex] as VideoComponentProperties
            }
            dataKeys={dataKeys}
            onValueChange={(component) => {
              onComponentChange(component);
            }}
          />
        )}
    </div>
  );
}
