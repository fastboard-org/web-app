import { FastboardGroupChartProperties } from "@/types/editor/group-chart-types";
import { Accordion, AccordionItem, Checkbox, Input } from "@nextui-org/react";
import QuerySelection from "@/components/editor/QuerySelection";
import GroupKeySelect from "@/components/editor/fastboard-components/group-chart/properties/GroupKeySelect";
import { QueryType } from "@/types/connections";
import ColorPicker from "@/components/shared/ColorPicker";
import { useTheme } from "next-themes";
import { queryToQueryData } from "@/lib/rest-queries";

const FastboardGroupChartPropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardGroupChartProperties;
  onValueChange: (properties: FastboardGroupChartProperties) => void;
}) => {
  const { theme } = useTheme();

  const {
    sourceQueryData,
    keys,
    groupBy,
    emptyMessage,
    title,
    subtitle,
    minimizedLabels,
    barsColor,
  } = properties;

  return (
    <Accordion
      selectionMode="multiple"
      isCompact
      fullWidth
      defaultExpandedKeys={["basic", "texts", "style"]}
    >
      <AccordionItem
        key="basic"
        title="Basic"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-2 overflow-x-hidden">
          <QuerySelection
            selectedQueryId={sourceQueryData?.queryId || ""}
            onQuerySelect={(sourceQuery) => {
              onValueChange({
                ...properties,
                sourceQueryData: queryToQueryData(sourceQuery),
                keys: [],
                groupBy: "",
              });
            }}
            type={QueryType.GET}
          />
          <GroupKeySelect
            keys={keys}
            onChange={(groupKey) => {
              onValueChange({
                ...properties,
                groupBy: groupKey,
              });
            }}
            groupKey={groupBy || ""}
          />
        </div>
      </AccordionItem>
      <AccordionItem
        key="texts"
        title="Texts"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-5 overflow-x-hidden">
          <Input
            classNames={{
              mainWrapper: "mt-2",
            }}
            label="Title"
            labelPlacement="outside"
            placeholder="Enter a title"
            value={title}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                title: value,
              });
            }}
          />
          <Input
            label="Subtitle"
            labelPlacement="outside"
            placeholder="Enter a subtitle"
            value={subtitle}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                subtitle: value,
              });
            }}
          />
          <Input
            label="Empty message"
            labelPlacement="outside"
            placeholder="Enter an empty message"
            value={emptyMessage}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                emptyMessage: value,
              });
            }}
          />
        </div>
      </AccordionItem>
      <AccordionItem key="style" title="Style" className="pb-2">
        <Checkbox
          defaultSelected={minimizedLabels}
          onChange={(e) => {
            onValueChange({
              ...properties,
              minimizedLabels: e.target.checked,
            });
          }}
        >
          Minimized labels
        </Checkbox>
        <ColorPicker
          label="Bar color"
          initialColor={theme === "light" ? barsColor.light : barsColor.dark}
          onColorChange={(color) => {
            if (theme === "light") {
              onValueChange({
                ...properties,
                barsColor: { ...barsColor, light: color },
              });
            } else {
              onValueChange({
                ...properties,
                barsColor: { ...barsColor, dark: color },
              });
            }
          }}
        />
      </AccordionItem>
    </Accordion>
  );
};

export default FastboardGroupChartPropertiesComponent;
