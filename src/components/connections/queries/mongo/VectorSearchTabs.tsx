import scrollbarStyles from "@/styles/scrollbar.module.css";
import {
  Accordion,
  AccordionItem,
  Button,
  Code,
  Input,
  Slider,
  Snippet,
  Spinner,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import ResponseViewer from "@/components/connections/queries/ResponseViewer";
import { useEffect, useState } from "react";
import { TickCircle } from "iconsax-react";
import { Connection, Query } from "@/types/connections";
import { toast } from "sonner";
import { useUpdateQuery } from "@/hooks/connections/useUpdateQuery";
import { useCreateQuery } from "@/hooks/connections/useCreateQuery";
import { useCreateEmbeddings } from "@/hooks/adapter/useCreateEmbeddings";

const AccordionTick = ({
  completed = false,
  loading = false,
}: {
  completed: boolean;
  loading: boolean;
}) => {
  return loading ? (
    <Spinner size={"sm"} />
  ) : (
    <TickCircle
      size={20}
      opacity={completed ? 1 : 0.25}
      className={"transition-all duration-300"}
      style={{
        color: completed ? "#00b341" : "",
      }}
    />
  );
};

const VectorSearchTabs = ({
  connection,
  query,
  onQueryChange,
  collectionName,
  response,
}: {
  connection: Connection;
  query: Query;
  onQueryChange: (query: Query) => void;
  collectionName: string;
  response: any;
}) => {
  const queryExists = !query?.id?.includes(" new");

  const [selectedTab, setSelectedTab] = useState("config");
  const [accordionItemOpen, setAccordionItemOpen] = useState(
    new Set<string>(["1"]),
  );

  const [firstStepLoading, setFirstStepLoading] = useState(false);
  const [secondStepLoading, setSecondStepLoading] = useState(false);

  const handleSuccess = (query: Query) => {
    onQueryChange(query);
    setFirstStepLoading(false);
    setSecondStepLoading(false);
  };

  const { createQuery } = useCreateQuery({
    onSuccess: handleSuccess,
    onError: (error: any) => {
      console.error("Error creating query", error);
      toast.error("Error creating query, try again later.");
    },
  });

  const { updateQuery } = useUpdateQuery({
    onSuccess: handleSuccess,
    onError: (error: any) => {
      console.error("Error updating query", error);
      toast.error("Error updating query, try again later.");
    },
  });

  const { createEmbeddings } = useCreateEmbeddings({
    onSuccess: handleSuccess,
    onError: (error: any) => {
      console.error("Error creating embeddings", error);
      toast.error("Error creating embeddings, try again later.");
    },
  });

  const handleSave = (newMetadata: any) => {
    const shouldCreate = !queryExists;

    if (shouldCreate) {
      createQuery({
        name: query.name,
        connectionId: connection.id,
        metadata: {
          ...query.metadata,
          ...newMetadata,
          collection: collectionName,
        },
      });
    } else {
      updateQuery({
        id: query.id,
        name: query.name,
        metadata: {
          ...query.metadata,
          ...newMetadata,
          collection: collectionName,
        },
      });
    }
  };

  useEffect(() => {
    if (response) setSelectedTab("response");
  }, [response]);

  return (
    <Tabs
      classNames={{
        panel: "p-0 mt-2 h-full overflow-y-auto " + scrollbarStyles.scrollbar,
      }}
      selectedKey={selectedTab}
      onSelectionChange={(key) => setSelectedTab(key as string)}
    >
      <Tab key={"config"} title={"Config"} className={"flex gap-5"}>
        <Accordion
          selectedKeys={accordionItemOpen}
          onSelectionChange={(keys) =>
            setAccordionItemOpen(keys as Set<string>)
          }
        >
          <AccordionItem
            key="1"
            aria-label="Create Index in Atlas"
            title={
              <span className={"flex items-center w-[215px] justify-between"}>
                Create Index in Atlas{" "}
                <AccordionTick
                  completed={query?.metadata?.index_created}
                  loading={firstStepLoading}
                />
              </span>
            }
          >
            <div className={"flex flex-col gap-4"}>
              <div className={"flex flex-col gap-4 w-full"}>
                <p>
                  Create a new{" "}
                  <a
                    href="https://cloud.mongodb.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    Atlas
                  </a>{" "}
                  Search index in your Atlas cluster to enable vector search.
                </p>
                <p>
                  You can create an Atlas Search Index by navigating to <br />
                  "Atlas Search" {">"} "Create Search Index" {">"} "Atlas Vector
                  Search - JSON Editor"
                </p>
                <p>
                  You can also watch this{" "}
                  <a
                    href="https://youtu.be/o2ss2LJNZVE?si=OeekpWsRj-Yrn7Cy"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    video
                  </a>{" "}
                  to learn how to create an Atlas Search Index.
                </p>
                <p>
                  Select the collection you want to create the index for and
                  paste the following index definition in the JSON editor.
                </p>
                <p>
                  Index name must be <Code>fastboard_index</Code>.
                </p>
                <Button
                  color={"primary"}
                  className={"w-[fit-content] p-4"}
                  onClick={() => {
                    setAccordionItemOpen(new Set(["2"]));
                    setFirstStepLoading(true);
                    handleSave({
                      index_created: true,
                    });
                  }}
                  isLoading={firstStepLoading}
                >
                  I have created the index in Atlas
                </Button>
              </div>
              <div className={"h-full"}>
                <Snippet
                  className={"w-full"}
                  symbol={""}
                  classNames={{
                    copyButton: "self-start",
                  }}
                >
                  <span>{"{"}</span>
                  <span className={"ml-4"}>"fields": {"["}</span>
                  <span className={"ml-8"}>{"{"}</span>
                  <span className={"ml-12"}>"type": "vector",</span>
                  <span className={"ml-12"}>"path": "embedding"</span>
                  <span className={"ml-12"}>"numDimensions": 1536</span>
                  <span className={"ml-12"}>"similarity": "cosine"</span>
                  <span className={"ml-8"}>{"}"}</span>
                  <span className={"ml-4"}>]</span>
                  <span>{"}"}</span>
                </Snippet>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Create Embeddings"
            title={
              <span className={"flex items-center w-[215px] justify-between"}>
                Create Embeddings{" "}
                <AccordionTick
                  completed={query?.metadata?.embeddings_created}
                  loading={secondStepLoading}
                />
              </span>
            }
            isDisabled={!query?.metadata?.index_created}
          >
            <div className={"flex flex-col gap-4"}>
              <div className={"flex gap-4 w-full items-center"}>
                <p>
                  Select the field of the documents in your collection that you
                  want to use for the vector search.
                </p>
              </div>
              <Input
                label={"Index Field"}
                placeholder={"Enter a field name"}
                className={"w-full"}
                value={query?.metadata?.index_field}
                onChange={(e) => {
                  onQueryChange({
                    ...query,
                    metadata: {
                      ...query.metadata,
                      index_field: e.target.value,
                    },
                  });
                }}
              />
              <Button
                color={"primary"}
                className={"w-[fit-content]"}
                onClick={() => {
                  setSecondStepLoading(true);
                  createEmbeddings({
                    queryId: query.id,
                    index_field: query?.metadata?.index_field,
                  });
                }}
                isLoading={secondStepLoading}
                isDisabled={!query?.metadata?.index_field || !collectionName}
              >
                Create Embeddings
              </Button>
            </div>
          </AccordionItem>
        </Accordion>
      </Tab>
      <Tab key={"query"} title={"Query"} className={"flex gap-5"}>
        <div className={"w-full flex gap-5 overflow-hidden"}>
          <Textarea
            label={"Query Text"}
            labelPlacement={"outside"}
            placeholder={"Enter a query"}
            className={"w-[90%] h-full"}
            size={"lg"}
            classNames={{
              inputWrapper: "!h-full",
              input: "h-full " + scrollbarStyles.scrollbar,
            }}
            value={query?.metadata?.query}
            onChange={(e) => {
              onQueryChange({
                ...query,
                metadata: {
                  ...query.metadata,
                  query: e.target.value,
                },
              });
            }}
          />
          <div className={"w-1/2 flex flex-col gap-5"}>
            <Slider
              label={"Limit"}
              step={1}
              minValue={1}
              maxValue={20}
              defaultValue={5}
              value={query?.metadata?.limit || 5}
              onChange={(value) => {
                onQueryChange({
                  ...query,
                  metadata: {
                    ...query.metadata,
                    limit: value,
                  },
                });
              }}
            />
            <Input
              label={"Number of Candidates"}
              labelPlacement={"outside"}
              placeholder={"Enter a number"}
              size={"lg"}
              type={"number"}
              value={query?.metadata?.num_candidates || 100}
              onChange={(e) => {
                onQueryChange({
                  ...query,
                  metadata: {
                    ...query.metadata,
                    num_candidates: parseInt(e.target.value),
                  },
                });
              }}
            />
          </div>
        </div>
      </Tab>
      <Tab key={"response"} title={"Response"}>
        <ResponseViewer data={response} />
      </Tab>
    </Tabs>
  );
};

export default VectorSearchTabs;
