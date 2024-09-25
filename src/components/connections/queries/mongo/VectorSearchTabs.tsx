import scrollbarStyles from "@/styles/scrollbar.module.css";
import {
  Accordion,
  AccordionItem,
  Button,
  Code,
  Input,
  Slider,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import BodyEditor from "@/components/connections/queries/BodyEditor";
import { isValidBody } from "@/lib/queries";
import { methodHasUpdateBody } from "@/lib/mongo-methods";
import ResponseViewer from "@/components/connections/queries/ResponseViewer";
import { useState } from "react";
import { TickCircle } from "iconsax-react";

const VectorSearchTabs = () => {
  const [selectedTab, setSelectedTab] = useState("config");

  return (
    <Tabs
      classNames={{
        panel: "p-0 mt-2 h-full overflow-y-auto " + scrollbarStyles.scrollbar,
      }}
      selectedKey={selectedTab}
      onSelectionChange={(key) => setSelectedTab(key as string)}
    >
      <Tab key={"config"} title={"Config"} className={"flex gap-5"}>
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Create Index in Atlas"
            title={
              <span className={"flex items-center w-[215px] justify-between"}>
                Create Index in Atlas <TickCircle size={20} opacity={0.25} />
              </span>
            }
          >
            <div className={"flex flex-col gap-4"}>
              <div className={"flex flex-col gap-4 w-full"}>
                <p>
                  Create a new Atlas Search index in your Atlas cluster to
                  enable vector search.
                </p>
                <p>
                  You can create an Atlas Search Index by navigating to <br />
                  "Atlas Search" {">"} "Create Search Index" {">"} "Atlas Vector
                  Search - JSON Editor"
                </p>
                <p>
                  Select the collection you want to create the index for and
                  paste the following index definition in the JSON editor.
                </p>
                <p>
                  Index name must be <Code>fastboard_index</Code>.
                </p>
                <Button color={"primary"} className={"w-[fit-content] p-4"}>
                  I have created the index in Atlas
                </Button>
              </div>
              <div className={"h-full"}>
                <Code className={"flex flex-col pr-5"}>
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
                </Code>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Create Embeddings"
            title={
              <span className={"flex items-center w-[215px] justify-between"}>
                Create Embeddings <TickCircle size={20} opacity={0.25} />
              </span>
            }
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
              />
              <Button color={"primary"} className={"w-[fit-content]"}>
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
          />
          <div className={"w-1/2 flex flex-col gap-5"}>
            <Slider
              label={"Limit"}
              step={1}
              minValue={1}
              maxValue={20}
              defaultValue={5}
            />
            <Input
              label={"Number of Candidates"}
              labelPlacement={"outside"}
              placeholder={"Enter a number"}
              size={"lg"}
              type={"number"}
            />
          </div>
        </div>
      </Tab>
      <Tab key={"response"} title={"Response"}>
        <ResponseViewer data={null} />
      </Tab>
    </Tabs>
  );
};

export default VectorSearchTabs;
