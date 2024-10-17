import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
import { FastboardCardsProperties } from "@/types/editor/cards-types";
import QuerySelection from "../../QuerySelection";
import { QueryType } from "@/types/connections";
import { queryToQueryData } from "@/lib/rest-queries";

const FastboardCardsPropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardCardsProperties;
  onValueChange: (properties: FastboardCardsProperties) => void;
}) => {
  const {
    sourceQuery,
    emptyMessage,
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
  return (
    <Accordion
      selectionMode="multiple"
      isCompact
      fullWidth
      defaultExpandedKeys={["basic", "fields", "style"]}
    >
      <AccordionItem
        key="basic"
        title="Basic"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-5  overflow-x-hidden">
          <QuerySelection
            selectedQueryId={sourceQuery?.queryId || ""}
            onQuerySelect={(sourceQuery) => {
              onValueChange({
                ...properties,
                sourceQuery: queryToQueryData(sourceQuery),
              });
            }}
            type={QueryType.GET}
          />
        </div>
      </AccordionItem>

      <AccordionItem
        key="fields"
        title="Fields"
        className="pb-2"
        classNames={{
          title: "font-medium",
        }}
      >
        {/* Title Selector */}
        <div className="flex flex-col gap-5">
          <Select
            aria-label="Title selector"
            items={queryFields}
            selectedKeys={[cardTitleField || ""]}
            label="Card Title"
            labelPlacement="outside"
            placeholder="Select title"
            onSelectionChange={(e) => {
              const newTitleField = queryFields.find(
                (field) => field.key === e.currentKey
              );
              onValueChange({
                ...properties,
                cardTitleField: newTitleField ? newTitleField.key : "",
              });
            }}
            errorMessage="Something went wrong, title field not found"
          >
            {(field) => <SelectItem key={field.key}>{field.label}</SelectItem>}
          </Select>
        </div>

        {/* Subtitle Selector */}
        <div className="flex flex-col gap-5">
          <Select
            aria-label="Subtitle selector"
            items={queryFields}
            disallowEmptySelection={false}
            selectedKeys={[cardSubtitleField || ""]}
            label="Card Subtitle"
            labelPlacement="outside"
            placeholder="Select subtitle"
            onSelectionChange={(e) => {
              const newSubtitleField = queryFields.find(
                (field) => field.key === e.currentKey
              );
              onValueChange({
                ...properties,
                cardSubtitleField: newSubtitleField ? newSubtitleField.key : "",
              });
            }}
            errorMessage="Something went wrong, subtitle field not found"
          >
            {(field) => <SelectItem key={field.key}>{field.label}</SelectItem>}
          </Select>
        </div>

        {/* Image Selector */}
        <div className="flex flex-col gap-5">
          <Select
            aria-label="Image selector"
            items={queryFields}
            selectedKeys={[cardImageField || ""]}
            label="Card Image"
            labelPlacement="outside"
            placeholder="Select image"
            onSelectionChange={(e) => {
              const newImageField = queryFields.find(
                (field) => field.key === e.currentKey
              );
              onValueChange({
                ...properties,
                cardImageField: newImageField ? newImageField.key : "",
              });
            }}
            errorMessage="Something went wrong, image field not found"
          >
            {(field) => <SelectItem key={field.key}>{field.label}</SelectItem>}
          </Select>
        </div>

        {/* Footer Selector */}
        <div className="flex flex-col gap-5">
          <Select
            aria-label="Footer selector"
            items={queryFields}
            selectedKeys={[cardFooterField || ""]}
            label="Card Footer"
            labelPlacement="outside"
            placeholder="Select footer"
            onSelectionChange={(e) => {
              const newFooterField = queryFields.find(
                (field) => field.key === e.currentKey
              );
              onValueChange({
                ...properties,
                cardFooterField: newFooterField ? newFooterField.key : "",
              });
            }}
            errorMessage="Something went wrong, footer field not found"
          >
            {(field) => <SelectItem key={field.key}>{field.label}</SelectItem>}
          </Select>
        </div>

        {/* Link Selector */}
        <div className="flex flex-col gap-5">
          <Select
            aria-label="Link selector"
            items={queryFields}
            selectedKeys={[cardLinkField || ""]}
            label="Card Link"
            labelPlacement="outside"
            placeholder="Select link"
            onSelectionChange={(e) => {
              const newLinkField = queryFields.find(
                (field) => field.key === e.currentKey
              );
              onValueChange({
                ...properties,
                cardLinkField: newLinkField ? newLinkField.key : "",
              });
            }}
            errorMessage="Something went wrong, link field not found"
          >
            {(field) => <SelectItem key={field.key}>{field.label}</SelectItem>}
          </Select>
        </div>

        {/* Tooltip Selector */}
        <div className="flex flex-col gap-5">
          <Select
            aria-label="Tooltip selector"
            items={queryFields}
            selectedKeys={[cardTooltipField || ""]}
            label="Card Tooltip"
            labelPlacement="outside"
            placeholder="Select tooltip"
            onSelectionChange={(e) => {
              const newTooltipField = queryFields.find(
                (field) => field.key === e.currentKey
              );
              onValueChange({
                ...properties,
                cardTooltipField: newTooltipField ? newTooltipField.key : "",
              });
            }}
            errorMessage="Something went wrong, tooltip field not found"
          >
            {(field) => <SelectItem key={field.key}>{field.label}</SelectItem>}
          </Select>
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
                color={cardLayout === "regular" ? "primary" : "default"}
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
                color={cardLayout === "irregular" ? "primary" : "default"}
              >
                Irregular
              </Button>
            </ButtonGroup>
          </div>
          <Slider
            label="Cards per row"
            isDisabled={cardLayout === "irregular"}
            step={1}
            minValue={1}
            maxValue={7}
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

export default FastboardCardsPropertiesComponent;
