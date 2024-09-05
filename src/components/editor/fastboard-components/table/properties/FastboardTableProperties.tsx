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
import {
  FastboardTableProperties,
  TableActionProperty,
} from "@/types/editor/table-types";
import QuerySelection from "@/components/editor/QuerySelection";
import ReorderableColumns from "./ReorderableColumns";
import TableActionsList from "./TableActionsList";
import TableAddOnsList from "./TableAddOnsList";
import TableAddRowProperties from "./TableAddRowProperties";
import { useRecoilValue } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import { ComponentId } from "@/types/editor";
import TableStyle from "./TableStyle";
import { DeleteActionProperties } from "./DeleteActionProperties";

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
    sourceQueryData,
    rowsPerPage,
    emptyMessage,
    columns,
    actions,
    pinActions,
    addOns,
  } = properties;
  const { selectedComponentId } = useRecoilValue(propertiesDrawerState);
  const [columnsProperties, setColumnsProperties] = useState(columns);
  const [actionSelected, setActionSelected] =
    useState<TableActionProperty | null>(null);
  const [addOnSelected, setAddOnSelected] = useState<string | null>(null);

  useEffect(() => {
    setColumnsProperties(columns);
  }, [columns]);

  useEffect(() => {
    // Reset selectinos when component is changed
    setActionSelected(null);
    setAddOnSelected(null);
  }, [selectedComponentId]);

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem
          key={"baseProperties"}
          onPress={() => {
            setActionSelected(null);
            setAddOnSelected(null);
          }}
        >
          Table
        </BreadcrumbItem>{" "}
        {actionSelected && (
          <BreadcrumbItem key={"actionProperties"}>Row action</BreadcrumbItem>
        )}
        {addOnSelected && (
          <BreadcrumbItem key={"addRowProperties"}>Add row</BreadcrumbItem>
        )}
      </Breadcrumbs>
      <Spacer y={4} />

      {!actionSelected && !addOnSelected && (
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
                selectedQueryId={sourceQueryData?.queryId || ""}
                onQuerySelect={(newQuery) => {
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
                    columns: [],
                  });
                }}
              />
              {!sourceQueryData && (
                <div className="flex h-10 justify-center items-center bg-warning-100 rounded-xl">
                  <span className="text-sm text-warning-600">
                    Select query to see columns.
                  </span>
                </div>
              )}
              {sourceQueryData && (
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
              <div className="flex flex-row justify-between items-center">
                <h1 className="w-full text-sm">Rows per page</h1>
                <Input
                  type="number"
                  value={String(rowsPerPage)}
                  min={1}
                  max={100}
                  onValueChange={(value) => {
                    onValueChange({
                      ...properties,
                      rowsPerPage: Number(value),
                    });
                  }}
                  className="w-[20%]"
                />
              </div>
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
            <div className="flex flex-col gap-y-2">
              <TableActionsList
                tableId={componentId}
                actionsProperties={actions}
                onActionSelect={(action) => {
                  setActionSelected(action);
                }}
                onChange={(newActions) => {
                  onValueChange({
                    ...properties,
                    actions: newActions,
                  });
                }}
              />
              <div className="flex flex-row justify-between pl-2">
                <span className="text-md">Pin action column</span>
                <Checkbox
                  isSelected={pinActions}
                  onValueChange={(value) => {
                    onValueChange({
                      ...properties,
                      pinActions: value,
                    });
                  }}
                />
              </div>
            </div>
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

      {actionSelected && actionSelected.type == "delete" && (
        <DeleteActionProperties
          action={actionSelected}
          onChange={(action) => {
            setActionSelected(action);
            onValueChange({
              ...properties,
              actions: actions.map((a) => (a.key === action.key ? action : a)),
            });
          }}
        />
      )}
      {actionSelected && actionSelected.type == "view" && (
        <DeleteActionProperties
          action={actionSelected}
          onChange={(action) => {
            setActionSelected(action);
            onValueChange({
              ...properties,
              actions: actions.map((a) => (a.key === action.key ? action : a)),
            });
          }}
        />
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
