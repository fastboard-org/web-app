import { FormProperties } from "@/types/editor/form";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";

export default function FastboardForm({
  properties,
}: {
  properties: FormProperties;
}) {
  const { title } = properties;

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <Divider />
      <CardBody>
        <Input disabled variant="bordered" />
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button type="submit" color="primary">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
