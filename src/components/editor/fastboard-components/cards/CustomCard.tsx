import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import CardEntry from "./CardEntry";

const CustomCard = ({
  data,
  className,
}: {
  data: {
    header: string;
    footer: string;
    body: { key: string; value: string }[];
  };
  className?: string;
}) => {
  const headerText = data.header;
  const footerText = data.footer;
  const bodyData = data.body;

  return (
    <div className="flex grow-0 h-fit min-h-full w-1/4 px-5 py-2 border-4 border-green-500">
      <Card
        aria-label="Fastboard cards draggable"
        isFooterBlurred
        // className={`h-full ${className}`}
        className="grow-0 h-full w-full max-h-full border-4 border-white"
      >
        <CardHeader className="shrink h-1/5 w-full flex justify-center items-center text-medium border-4 border-yellow-500">
          {headerText}
        </CardHeader>
        <Divider />
        <CardBody
          aria-label="Fastboard cards draggable body"
          className="shrink h-4/6 text-small border-4 border-red-500"
        >
          <div className="flex flex-col">
            {bodyData.map((item, index) => (
              <CardEntry key={index} entry={item} />
            ))}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="shrink h-1/6 flex justify-start items-center text-tiny border-4 border-blue-500">
          {footerText}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomCard;
