import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { FastboardTableProperties } from "./FastboardTable";
import { Hierarchy3 } from "iconsax-react";
import { useEffect, useState } from "react";
import { ConnectionType, HTTP_METHOD } from "@/types/connections";
import ReorderableColumns from "./ReorderableColumns";
import { SiMongodb } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import TableActionsList from "./TableActionsList";

const connectionIcons = {
  [ConnectionType.MONGO]: <SiMongodb size={24} className={"text-primary"} />,
  [ConnectionType.SQL]: (
    <BiLogoPostgresql size={24} className={"text-primary"} />
  ),
  [ConnectionType.REST]: (
    <Hierarchy3 size={24} className={"text-primary"} variant={"Bold"} />
  ),
};

const FastboardTablePropertiesComponent = ({
  properties,
  onValueChange,
}: {
  properties: FastboardTableProperties;
  onValueChange: (properties: FastboardTableProperties) => void;
}) => {
  const { query, emptyMessage, columns, actions, isStriped } = properties;
  const [columnsProperties, setColumnsProperties] = useState(columns);
  const [hideHeader, setHideHeader] = useState(properties.hideHeader);

  console.log("rendering properties");

  useEffect(() => {
    console.log("update columns", columns);
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
        classNames={{
          title: "font-bold",
        }}
      >
        <div className="flex flex-col gap-2 overflow-x-hidden">
          <Autocomplete
            aria-label="Query data selector"
            allowsCustomValue
            defaultItems={mockQueries}
            disabledKeys={mockQueries
              .filter((q) => q.connection.type !== ConnectionType.REST)
              .map((q) => q.id)}
            defaultSelectedKey={mockQueries[0].id}
            selectedKey={mockQueries.find((q) => q.id === query.id)?.id}
            label="Query"
            labelPlacement="outside"
            placeholder="Select query"
            startContent={<Hierarchy3 className={"text-primary"} />}
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
          >
            {(query) => (
              <AutocompleteItem
                key={query.id}
                startContent={connectionIcons[query.connection.type]}
              >
                {query.name}
              </AutocompleteItem>
            )}
          </Autocomplete>

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
            labelPlacement="outside-left"
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
        title="Actions"
        classNames={{
          title: "font-bold",
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
        title="Style"
        classNames={{
          title: "font-bold",
        }}
      >
        <div className="flex flex-col gap-2">
          <Checkbox
            isSelected={hideHeader}
            onValueChange={(isSelected) => {
              setHideHeader(isSelected);
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
