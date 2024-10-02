import { RestFormDataParameter } from "@/types/connections";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Add, Trash } from "iconsax-react";

export default function FormDataEditor({
  formDataBody,
  onChange,
}: {
  formDataBody: RestFormDataParameter[];
  onChange: (headers: RestFormDataParameter[]) => void;
}) {
  formDataBody = formDataBody?.length ? formDataBody : [{ key: "", value: "" }];

  return (
    <Table aria-label="Headers table" removeWrapper className={"h-full pr-2 "}>
      <TableHeader>
        <TableColumn>Key</TableColumn>
        <TableColumn>Value</TableColumn>
        <TableColumn>
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {formDataBody.map(({ key, value }, index) => {
          const isLast = index === formDataBody.length - 1;
          return (
            <TableRow key={index}>
              <TableCell className={"w-1/2 pl-0"}>
                <Input
                  value={key}
                  placeholder={"key"}
                  onValueChange={(value) => {
                    const newBody = formDataBody.map((parameter, i) => {
                      if (i === index) {
                        return { ...parameter, key: value };
                      }
                      return parameter;
                    });
                    onChange(newBody);
                  }}
                />
              </TableCell>
              <TableCell className={"w-1/2 pl-0"}>
                <Input
                  value={value as string}
                  placeholder={"value"}
                  onValueChange={(value) => {
                    const newBody = formDataBody.map((parameter, i) => {
                      if (i === index) {
                        return { ...parameter, value: value };
                      }
                      return parameter;
                    });
                    onChange(newBody);
                  }}
                />
              </TableCell>
              <TableCell className={"p-0"}>
                <Button
                  isIconOnly
                  variant={"flat"}
                  onPress={() => {
                    if (isLast) {
                      onChange([...formDataBody, { key: "", value: "" }]);
                    } else {
                      onChange(formDataBody.filter((_, i) => i !== index));
                    }
                  }}
                >
                  {isLast ? <Add size={20} /> : <Trash size={20} />}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
