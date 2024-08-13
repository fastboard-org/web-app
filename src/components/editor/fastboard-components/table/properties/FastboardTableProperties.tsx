import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Checkbox,
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

const FastboardTablePropertiesComponent = ({
  componentId,
  properties,
  onValueChange,
}: {
  componentId: ComponentId;
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) => {
  const {
    sourceQuery,
    emptyMessage,
    columns,
    actions,
    addOns,
    hideHeader,
    isStriped,
  } = properties;
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
          defaultExpandedKeys={["basic", "actions", "add-ons", "style"]}
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
