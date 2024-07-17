import { Accordion, AccordionItem, Checkbox, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ConnectionType, HTTP_METHOD } from "@/types/connections";
import ReorderableColumns from "./ReorderableColumns";
import TableActionsList from "./TableActionsList";
import { FastboardTableProperties } from "@/types/editor/table-types";
import QuerySelector from "../QuerySelector";

const FastboardTablePropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) => {
  const { query, emptyMessage, columns, actions, hideHeader, isStriped } =
    properties;
  const [columnsProperties, setColumnsProperties] = useState(columns);

  useEffect(() => {
    setColumnsProperties(columns);
  }, [columns]);

  const mockQueries = [
    {
      id: "1",
      name: "Pokemons",
      connection: {
        id: "1",
        name: "PokeApi",
        type: ConnectionType.REST,
        credentials: {
          url: "https://pokeapi.co/api/v2",
        },
        variables: {
          posts_endpoint: "posts",
        },
      },
      metadata: {
        method: HTTP_METHOD.GET,
        path: "/pokemon?limit=100000&offset=0",
        field: "results",
        columns: [
          { key: "name", label: "Name" },
          { key: "url", label: "URL" },
        ],
      },
    },
    {
      id: "2",
      name: "Pokemon by id",
      connection: {
        id: "1",
        name: "PokeApi",
        type: ConnectionType.REST,
        credentials: {
          url: "https://pokeapi.co/api/v2",
        },
        variables: {
          posts_endpoint: "posts",
        },
      },
      metadata: {
        method: HTTP_METHOD.GET,
        path: "/pokemon/1",
        field: null,
        columns: [
          { key: "abilities", label: "Abilities" },
          { key: "base_experience", label: "Base Experience" },
          { key: "height", label: "Height" },
        ],
      },
    },
    {
      id: "3",
      name: "Custom data",
      connection: {
        id: "1",
        name: "PokeApi",
        type: ConnectionType.SQL,
        credentials: {
          url: "https://pokeapi.co/api/v2",
        },
        variables: {
          posts_endpoint: "posts",
        },
      },
      metadata: {},
    },
  ];

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
          <QuerySelector
            queries={mockQueries}
            selectedQueryId={query.id}
            onSelectionChange={(key) => {
              const query = mockQueries.find((q) => q.id === key);
              if (!query) return;
              if (!query.metadata.columns) return;

              setColumnsProperties(
                query.metadata.columns.map((c) => ({
                  column: c,
                  visible: true,
                }))
              );

              onValueChange({
                ...properties,
                columns: query.metadata.columns.map((c) => ({
                  column: c,
                  visible: true,
                })),
                //This will change in future, //TODO: only send query id
                query: {
                  id: query.id,
                  url: `${query.connection.credentials.url}/${query.metadata.path}`,
                  field: query.metadata.field,
                },
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
