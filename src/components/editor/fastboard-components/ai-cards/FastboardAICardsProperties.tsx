import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
  Code,
  Input,
  Slider,
  Tooltip,
} from "@nextui-org/react";
import { FastboardAICardsProperties } from "@/types/editor/ai-cards-types";
import { queryToQueryData } from "@/lib/rest-queries";
import { QueryType } from "@/types/connections";
import QuerySelection from "@/components/editor/QuerySelection";
import { RiQuestionLine } from "react-icons/ri";

const FastboardAICardsPropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardAICardsProperties;
  onValueChange: (properties: FastboardAICardsProperties) => void;
}) => {
  const {
    sourceQueryData,
    searchLabel,
    searchPlaceholder,
    title,
    emptyMessage,
    cardTitleField,
    cardSubtitleField,
    cardImageField,
    cardLinkField,
    cardTooltipField,
    cardsPerRow,
    cardsHeight,
  } = properties;

  return (
    <Accordion
      selectionMode="multiple"
      isCompact
      fullWidth
      defaultExpandedKeys={["basic", "fields", "style", "texts"]}
    >
      <AccordionItem
        key="basic"
        title="Basic"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-5 overflow-x-hidden">
          <QuerySelection
            label={"Search Query"}
            selectedQueryId={sourceQueryData?.queryId || ""}
            onQuerySelect={(sourceQuery) => {
              onValueChange({
                ...properties,
                sourceQueryData: queryToQueryData(sourceQuery),
                parameters: sourceQuery.metadata?.parameters || [],
              });
            }}
            type={QueryType.AI}
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
        <div className="flex flex-col gap-5">
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
            label="Search Label"
            labelPlacement="outside"
            placeholder="Enter a label"
            value={searchLabel}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                searchLabel: value,
              });
            }}
          />
          <Input
            label="Search Placeholder"
            labelPlacement="outside"
            placeholder="Enter a placeholder"
            value={searchPlaceholder}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                searchPlaceholder: value,
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

      <AccordionItem
        key="fields"
        title={
          <div className={"flex items-center gap-2"}>
            Fields
            <Tooltip
              content={
                <p className={""}>
                  You can access inner fields by using <Code>"."</Code> <br />
                  E.g. <Code>user.name</Code>
                </p>
              }
              className={"p-3"}
              placement={"bottom"}
            >
              <div>
                <RiQuestionLine
                  className={"text-foreground-500 mb-1"}
                  size={15}
                />
              </div>
            </Tooltip>
          </div>
        }
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-5">
          <Input
            label="Card Title"
            labelPlacement="outside"
            placeholder="Enter a field"
            value={cardTitleField}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                cardTitleField: value,
              });
            }}
          />
          <Input
            label="Card Subtitle"
            labelPlacement="outside"
            placeholder="Enter a field"
            value={cardSubtitleField}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                cardSubtitleField: value,
              });
            }}
          />
          <Input
            label="Card Image"
            labelPlacement="outside"
            placeholder="Enter a field"
            value={cardImageField}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                cardImageField: value,
              });
            }}
          />
          <Input
            label="Card Link"
            labelPlacement="outside"
            placeholder="Enter a field"
            value={cardLinkField}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                cardLinkField: value,
              });
            }}
          />
          <Input
            label="Card Tooltip"
            labelPlacement="outside"
            placeholder="Enter a field"
            value={cardTooltipField}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                cardTooltipField: value,
              });
            }}
          />
        </div>
      </AccordionItem>

      <AccordionItem
        key="style"
        title="Style"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-3 overflow-hidden">
          <div>
            <p className="text-small mb-2">Card Layout</p>
            <ButtonGroup className="w-full" size={"sm"}>
              <Button
                onClick={() => {
                  onValueChange({
                    ...properties,
                    cardLayout: "regular",
                  });
                }}
                className={"w-full"}
                color={
                  properties.cardLayout === "regular" ? "primary" : "default"
                }
              >
                Regular
              </Button>
              <Button
                onClick={() => {
                  onValueChange({
                    ...properties,
                    cardLayout: "irregular",
                  });
                }}
                className={"w-full"}
                color={
                  properties.cardLayout === "irregular" ? "primary" : "default"
                }
              >
                Irregular
              </Button>
            </ButtonGroup>
          </div>
          <Slider
            label="Cards per row"
            isDisabled={properties.cardLayout === "irregular"}
            step={1}
            minValue={1}
            maxValue={5}
            defaultValue={3}
            value={cardsPerRow}
            onChange={(e) => {
              const selectedValue = e as number;
              onValueChange({
                ...properties,
                cardsPerRow: selectedValue,
              });
            }}
          />
          <Slider
            label="Cards height"
            step={100}
            minValue={100}
            maxValue={700}
            defaultValue={200}
            value={cardsHeight}
            onChange={(e) => {
              const selectedValue = e as number;
              onValueChange({
                ...properties,
                cardsHeight: selectedValue,
              });
            }}
          />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FastboardAICardsPropertiesComponent;
