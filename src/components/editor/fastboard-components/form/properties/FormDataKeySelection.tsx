import CustomSkeleton from "@/components/shared/CustomSkeleton";
import useGetQuery from "@/hooks/connections/useGetQuery";
import { Select, SelectItem } from "@nextui-org/react";

export default function FormDataKeySelection({
  selectedKey,
  queryId,
  onSelectionChange,
}: {
  selectedKey: string;
  queryId: string | null;
  onSelectionChange: (formDataKey: string) => void;
}) {
  const { query, loading } = useGetQuery(queryId || "");
  const parameters: () => { key: string; label: string }[] = () => {
    return (
      query?.metadata.parameters?.map(
        (p: { name: string; preview: string }) => ({
          key: p.name,
          label: p.name,
        })
      ) || []
    );
  };

  return (
    <CustomSkeleton isLoaded={!loading} loadingClassName="rounded-xl">
      <Select
        aria-label="Select query parameter"
        label="Query parameter"
        labelPlacement="outside"
        items={parameters()}
        selectedKeys={[selectedKey]}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onSelectionChange(e.target.value);
        }}
      >
        {(parameter) => (
          <SelectItem key={parameter.key}>{parameter.label}</SelectItem>
        )}
      </Select>
    </CustomSkeleton>
  );
}
