import { Button } from "@nextui-org/react";
import { useMemo } from "react";
import * as XLSX from "xlsx";
import { DocumentDownload } from "iconsax-react";

export default function CsvExporter({
  data,
  filename,
}: {
  data: any[];
  filename?: string;
}) {
  const workbook = useMemo(() => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    return workbook;
  }, [data]);

  return (
    <Button
      variant="flat"
      onPress={() => {
        const date = new Date();
        XLSX.writeFileXLSX(
          workbook,
          `${filename ? filename + "-" : ""}${
            date.getMonth() + 1
          } ${date.getDate()} ${date.getFullYear()} ${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.xlsx`
        );
      }}
      startContent={<DocumentDownload className="text-default-600" />}
    >
      Download
    </Button>
  );
}
