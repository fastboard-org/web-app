import { Button } from "@nextui-org/react";
import { SiMicrosoftexcel } from "react-icons/si";
import { useMemo } from "react";
import * as XLSX from "xlsx";
import { DocumentDownload } from "iconsax-react";

export default function CsvExporter({ data }: { data: any[] }) {
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
        XLSX.writeFileXLSX(workbook, "data.xlsx");
      }}
      startContent={<DocumentDownload className="text-default-600" />}
    >
      Download
    </Button>
  );
}
