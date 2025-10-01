import { FastboardGroupChartProperties } from "@/types/editor/group-chart-types";
import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import QuerySelection from "@/components/editor/QuerySelection";
import KeySelect from "@/components/editor/fastboard-components/shared/KeySelect";
import { QueryType } from "@/types/connections";
import ColorPicker from "@/components/shared/ColorPicker";
import { useTheme } from "next-themes";
import { queryToQueryData } from "@/lib/rest-queries";
import CheckBoxProperty from "@/components/shared/CheckBoxProperty";
import DisplayKeysList from "./DisplayKeysList";

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
    layout,
    customDisplayKey,
    customDisplayKeyLabel,
    showBarYAxis,
    displayKeys = [],
    pollable = false,
    pollInterval = 1,
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
          <KeySelect
            keys={keys}
            onChange={(groupKey) => {
              onValueChange({
                ...properties,
                groupBy: groupKey,
              });
            }}
            selectedKey={groupBy || ""}
          />
          <KeySelect
            keys={keys}
            onChange={(customDisplayKey) => {
              onValueChange({
                ...properties,
                customDisplayKey: customDisplayKey,
              });
            }}
            selectedKey={customDisplayKey || ""}
            label="Custom display key"
            placeholder="Select a custom display key"
            emptyContent="Select a query to see available keys"
          />
          {customDisplayKey && <Input
            label="Custom display key label"
            labelPlacement="outside"
            placeholder="Enter a custom display key label"
            value={customDisplayKeyLabel || ""}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                customDisplayKeyLabel: value,
              });
            }}
          />}
          
        </div>
      </AccordionItem>
      <AccordionItem
        key="data-refresh"
        title="Data Refresh"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-3 overflow-x-hidden">
          <CheckBoxProperty
            label="Auto-refresh data"
            isSelected={pollable}
            onValueChange={(value) => {
              onValueChange({ ...properties, pollable: value });
            }}
          />
          {pollable && (
            <Select
              label="Refresh interval"
              labelPlacement="outside"
              placeholder="Select interval"
              selectedKeys={[pollInterval.toString()]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                onValueChange({ ...properties, pollInterval: value });
              }}
            >
              <SelectItem key="1" value="1">
                1 minute
              </SelectItem>
              <SelectItem key="3" value="3">
                3 minutes
              </SelectItem>
              <SelectItem key="5" value="5">
                5 minutes
              </SelectItem>
              <SelectItem key="10" value="10">
                10 minutes
              </SelectItem>
            </Select>
          )}
        </div>
      </AccordionItem>
      <AccordionItem
        key="display-keys"
        title="Multiple Bars"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-3 overflow-x-hidden">
          <DisplayKeysList
            displayKeys={displayKeys}
            availableKeys={keys}
            onChange={(newDisplayKeys) => {
              onValueChange({
                ...properties,
                displayKeys: newDisplayKeys,
              });
            }}
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
        <div>
          <p className="text-small mb-2">Layout</p>
          <ButtonGroup className="w-full" size={"sm"}>
            <Button
              onClick={() => {
                onValueChange({
                  ...properties,
                  layout: "bar",
                });
              }}
              className={"w-full"}
              color={layout === "bar" ? "primary" : "default"}
            >
              Bar
            </Button>
            <Button
              onClick={() => {
                onValueChange({
                  ...properties,
                  layout: "pie",
                });
              }}
              className={"w-full"}
              color={layout === "pie" ? "primary" : "default"}
            >
              Pie
            </Button>
          </ButtonGroup>
        </div>
        {layout === "bar" && <div className={"my-3"}>
          <CheckBoxProperty
            label="Show Y axis"
            isSelected={showBarYAxis}
            onValueChange={(value) => {
              onValueChange({ ...properties, showBarYAxis: value });
            }}
          />
        </div>}
        <div className={"my-3"}>
          <CheckBoxProperty
            label={"Minimized labels"}
            isSelected={minimizedLabels}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                minimizedLabels: value,
              });
            }}
          />
        </div>

        <ColorPicker
          label="Color"
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
