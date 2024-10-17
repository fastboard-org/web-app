import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  Image,
} from "@nextui-org/react";
import { RiQuestionLine } from "react-icons/ri";

const CustomCard = ({
  title,
  subtitle,
  image,
  footer,
  layout,
  cardsPerRow,
  cardHeight = 200,
  link,
  tooltip,
}: {
  title: string;
  subtitle: string;
  image: string;
  footer: string;
  layout: "regular" | "irregular";
  cardsPerRow: number;
  cardHeight?: number;
  link?: string;
  tooltip?: string;
}) => {
  const cardWidth = 100 / cardsPerRow - 1 + "%";

  return (
    <Card
      className="py-4 relative card"
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
      {tooltip && (
        <Tooltip
          content={<p className={"max-w-[250px]"}>{tooltip}</p>}
          className={"p-5"}
          placement={"bottom"}
        >
          <div className={"absolute right-4 z-[1000]"}>
            <RiQuestionLine className={"text-foreground-500 mb-1"} size={20} />
          </div>
        </Tooltip>
      )}
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
            height={cardHeight}
          />
        )}
      </CardBody>
      <CardFooter className="shrink h-1/6 flex justify-start items-center text-tiny">
        {footer}
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
