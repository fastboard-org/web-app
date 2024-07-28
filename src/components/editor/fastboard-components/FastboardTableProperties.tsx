import { Accordion, AccordionItem, Checkbox, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ReorderableColumns from "./ReorderableColumns";
import TableActionsList from "./TableActionsList";
import { FastboardTableProperties } from "@/types/editor/table-types";
import QuerySelection from "../QuerySelection";

const FastboardTablePropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) => {
  const { sourceQuery, emptyMessage, columns, actions, hideHeader, isStriped } =
    properties;
  const [columnsProperties, setColumnsProperties] = useState(columns);

  useEffect(() => {
    setColumnsProperties(columns);
  }, [columns]);

  return (
    <Accordion
      selectionMode="multiple"
      isCompact
      fullWidth
      defaultExpandedKeys={["basic", "actions", "style"]}
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
            selectedQueryId={sourceQuery?.id || ""}
            onQuerySelect={(sourceQuery) => {
              onValueChange({
                ...properties,
                sourceQuery: sourceQuery,
              });
            }}
          />
          <ReorderableColumns
            columnsProperties={columnsProperties}
            onChange={(newOrder) => {
              onValueChange({
                ...properties,
                columns: newOrder,
              });
            }}
          />
          <Input
            label="Empty message"
            labelPlacement="outside"
            placeholder=""
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
        key="actions"
        className="pb-2"
        title="Actions"
        classNames={{
          title: "font-medium",
        }}
      >
        <TableActionsList
          actionsProperties={actions}
          onChange={(newActions) => {
            onValueChange({
              ...properties,
              actions: newActions,
            });
          }}
        />
      </AccordionItem>
      <AccordionItem
        key="style"
        className="pb-2"
        title="Style"
        classNames={{
          title: "font-medium",
        }}
      >
        <div className="flex flex-col gap-2">
          <Checkbox
            isSelected={hideHeader}
            onValueChange={(isSelected) => {
              onValueChange({
                ...properties,
                hideHeader: isSelected,
              });
            }}
          >
            Hide Header
          </Checkbox>
          <Checkbox
            isSelected={isStriped}
            onValueChange={(isSelected) => {
              onValueChange({
                ...properties,
                isStriped: isSelected,
              });
            }}
          >
            Stripped
          </Checkbox>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FastboardTablePropertiesComponent;
