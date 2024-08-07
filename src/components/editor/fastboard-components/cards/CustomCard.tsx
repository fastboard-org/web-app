import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import CardEntry from "./CardEntry";
import scrollbarStyles from "@/styles/scrollbar.module.css";

const CustomCard = ({
  data,
  cardsPerRow,
  className,
  height,
}: {
  data: {
    header: string;
    footer: string;
    body: { key: string; value: string }[];
  };
  cardsPerRow: number;
  className?: string;
  height?: string;
}) => {
  const headerText = data.header;
  const footerText = data.footer;
  const bodyData = data.body;
  const cardWidth = Math.floor(100 / cardsPerRow);

  return (
    <div
      className={`flex px-2 py-2`}
      style={{ width: `${cardWidth - 1}%`, height: height }}
    >
      <Card
        aria-label="Fastboard card component"
        className="grow-0 h-full w-full max-h-full"
      >
        <CardHeader className="h-1/5 w-full flex justify-center items-center">
          <p className="text-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {headerText}
          </p>
        </CardHeader>
        <Divider />
        <CardBody
          className={`shrink h-4/6 text-small ${scrollbarStyles.scrollbar}`}
        >
          <div className="flex flex-col">
            {bodyData.map((item, index) => (
              <CardEntry key={index} entry={item} />
            ))}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="shrink h-1/6 flex justify-start items-center text-tiny">
          {footerText}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomCard;
