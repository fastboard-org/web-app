import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Input,
  Spacer,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FastboardTableProperties } from "@/types/editor/table-types";
import QuerySelection from "@/components/editor/QuerySelection";
import ReorderableColumns from "./ReorderableColumns";
import TableActionsList from "./TableActionsList";
import TableAddOnsList from "./TableAddOnsList";
import TableAddRowProperties from "./TableAddRowProperties";
import { useRecoilValue } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import { ComponentId } from "@/types/editor";
import TableStyle from "./TableStyle";

const FastboardTablePropertiesComponent = ({
  componentId,
  properties,
  onValueChange,
}: {
  componentId: ComponentId;
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) => {
  const { sourceQuery, emptyMessage, columns, actions, addOns } = properties;
  const { selectedComponentId } = useRecoilValue(propertiesDrawerState);
  const [columnsProperties, setColumnsProperties] = useState(columns);
  const [addOnSelected, setAddOnSelected] = useState<string | null>(null);

  useEffect(() => {
    setColumnsProperties(columns);
  }, [columns]);

  useEffect(() => {
    // Reset add-on selection when the selected component changes
    setAddOnSelected(null);
  }, [selectedComponentId]);

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem
          key={"baseProperties"}
          onPress={() => {
            setAddOnSelected(null);
          }}
        >
          Table
        </BreadcrumbItem>
        {addOnSelected && (
          <BreadcrumbItem key={"addRowProperties"}>Add row</BreadcrumbItem>
        )}
      </Breadcrumbs>
      <Spacer y={4} />

      {!addOnSelected && (
        <Accordion
          selectionMode="multiple"
          isCompact
          fullWidth
          defaultExpandedKeys={["basic", "row-actions", "add-ons", "style"]}
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
            <div className="overflow-x-hidden">
              <QuerySelection
                selectedQueryId={sourceQuery?.id || ""}
                onQuerySelect={(sourceQuery) => {
                  onValueChange({
                    ...properties,
                    sourceQuery: sourceQuery,
                    columns: [],
                  });
                }}
              />
              {!sourceQuery && (
                <div className="flex h-10 justify-center items-center bg-warning-100 rounded-xl">
                  <span className="text-sm text-warning-600">
                    Select query to see columns.
                  </span>
                </div>
              )}
              {sourceQuery && (
                <ReorderableColumns
                  columnsProperties={columnsProperties}
                  onChange={(newOrder) => {
                    onValueChange({
                      ...properties,
                      columns: newOrder,
                    });
                  }}
                />
              )}
              <Spacer y={2} />
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
            key="row-actions"
            className="pb-2"
            title="Row actions"
            classNames={{
              title: "font-medium",
            }}
          >
            <TableActionsList
              tableId={componentId}
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
            key="add-ons"
            className="pb-2"
            title="Add ons"
            classNames={{ title: "font-medium" }}
          >
            <TableAddOnsList
              tableProperties={properties}
              onSelectAddOn={(key) => {
                setAddOnSelected(key);
              }}
              onValueChange={(addOns) => {
                onValueChange({
                  ...properties,
                  addOns,
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
            <TableStyle properties={properties} onValueChange={onValueChange} />
          </AccordionItem>
        </Accordion>
      )}

      {addOnSelected &&
        addOnSelected === "add-row-form" &&
        addOns.addRowForm && (
          <TableAddRowProperties
            properties={addOns.addRowForm}
            onValueChange={(value) => {
              onValueChange({
                ...properties,
                addOns: {
                  ...addOns,
                  addRowForm: value,
                },
              });
            }}
          />
        )}
    </div>
  );
};

export default FastboardTablePropertiesComponent;
