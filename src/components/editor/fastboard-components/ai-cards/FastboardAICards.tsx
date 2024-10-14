import { ComponentId, ComponentType } from "@/types/editor";
import { FastboardAICardsProperties } from "@/types/editor/ai-cards-types";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Image,
} from "@nextui-org/react";
import useExecuteQuery from "@/hooks/adapter/useExecuteQuery";
import { useParams } from "next/navigation";
import { useState } from "react";
import scrollbarStyles from "@/styles/scrollbar.module.css";
import { CiSearch } from "react-icons/ci";
import { toast } from "sonner";

const CustomCard = ({
  title,
  subtitle,
  image,
  link,
  layout,
  cardsPerRow,
}: {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  layout: "regular" | "irregular";
  cardsPerRow: number;
}) => {
  const cardWidth = 100 / cardsPerRow - 1 + "%";

  return (
    <Card
      className="py-4"
      style={{
        width: layout === "irregular" ? "fit-content" : cardWidth,
        maxWidth: layout === "irregular" ? "45%" : "unset",
      }}
      isPressable={Boolean(link)}
      onClick={() => {
        if (link) {
          window.open(link, "_blank");
        }
      }}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold text-default-500">
          {subtitle}
        </p>
        <h4 className="font-bold text-large truncate w-full text-start">
          {title}
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {image && (
          <Image
            alt="Image"
            className="object-cover rounded-xl"
            src={image}
            width={"100%"}
            height={200}
          />
        )}
      </CardBody>
    </Card>
  );
};

const getItemValue = (item: any, field: string) => {
  if (!field) return "";
  const innerFields = field.split(".");
  let value = item;
  innerFields.forEach((innerField) => {
    if (!value) return "";
    value = value[innerField];
  });

  return typeof value === "object" ? JSON.stringify(value) : value;
};

export default function FastboardAICards({
  id,
  properties,
}: {
  id: ComponentId;
  properties: FastboardAICardsProperties;
}) {
  const { id: dashboardId } = useParams();

  const [search, setSearch] = useState("");

  const {
    sourceQueryData,
    searchLabel,
    searchPlaceholder,
    title,
    emptyMessage,
    parameters,
    cardTitleField,
    cardSubtitleField,
    cardImageField,
    cardLinkField,
    cardLayout,
    cardsPerRow,
  } = properties;

  const { execute, data, isPending } = useExecuteQuery({
    dashboardId: dashboardId as string,
    onError: (error) => {
      console.error("Error executing query", error);
      toast.error("Error fetching data, try again later.");
    },
  });

  const handleSearch = () => {
    if (!sourceQueryData || !search) return;

    const parameter = parameters?.[0];

    let parametersToSend = {};

    if (parameter) {
      parametersToSend = {
        [parameter.name]: search,
      };
    }

    execute({
      queryData: sourceQueryData,
      parameters: parametersToSend,
    });
  };

  return (
    <div className={"w-full h-full"}>
      <div
        className={"w-full h-full flex flex-col p-3 relative justify-between"}
      >
        <div className={"flex gap-3 flex-col h-[20%]"}>
          {title && <h3 className={"text-4xl"}>{title}</h3>}
          <div className={"flex items-end justify-between"}>
            <Input
              className={"w-2/3"}
              label={searchLabel}
              labelPlacement={"outside"}
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={(value) => {
                setSearch(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              color={"primary"}
              isDisabled={!sourceQueryData || !search}
              isLoading={isPending}
              onClick={handleSearch}
              startContent={<CiSearch size={20} />}
            >
              Search
            </Button>
          </div>
        </div>
        <CustomSkeleton
          isLoaded={!isPending}
          className={"w-full h-[80%] rounded-xl"}
          onlyRenderOnLoad
        >
          <div
            className={
              "overflow-auto w-full h-full flex flex-wrap gap-y-5 " +
              scrollbarStyles.scrollbar
            }
            style={{
              justifyContent:
                cardLayout === "irregular" ? "center" : "space-between",
              columnGap: cardLayout === "irregular" ? "1.25rem" : "0",
            }}
          >
            {data?.body?.map((item: any, index: number) => (
              <CustomCard
                key={index}
                title={getItemValue(item, cardTitleField)}
                subtitle={getItemValue(item, cardSubtitleField)}
                image={getItemValue(item, cardImageField)}
                link={getItemValue(item, cardLinkField)}
                layout={cardLayout}
                cardsPerRow={cardsPerRow}
              />
            ))}
            {(!data?.body || data?.body?.length === 0) && (
              <div className={"w-full h-full flex justify-center"}>
                <p className={"mt-[15%] text-3xl h-[fit-content]"}>
                  {emptyMessage}
                </p>
              </div>
            )}
          </div>
        </CustomSkeleton>
      </div>
    </div>
  );
}
