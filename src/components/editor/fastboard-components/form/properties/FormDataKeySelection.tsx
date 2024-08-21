import CustomSkeleton from "@/components/shared/CustomSkeleton";
import useGetQuery from "@/hooks/connections/useGetQuery";
import { Select, SelectItem } from "@nextui-org/react";

export default function FormDataKeySelection({
  selectedKey,
  queryId,
  onSelectionChange,
  disabledKeys = [],
  label = "Query parameter",
  placeholder = "Select query parameter",
  isDisabled = false,
}: {
  selectedKey: string;
  queryId: string | null;
  onSelectionChange: (formDataKey: string) => void;
  disabledKeys?: string[];
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
}) {
  const { query, loading } = useGetQuery(queryId || "");
  const parameters: () => { key: string; label: string }[] = () => {
    return (
      query?.metadata.parameters?.map(
        (p: { name: string; preview: string }) => ({
          key: p.name,
          label: p.name,
        }),
      ) || []
    );
  };

  return (
    <CustomSkeleton isLoaded={!loading} loadingClassName="rounded-xl">
      <Select
        aria-label="Select query parameter"
        label={label}
        placeholder={placeholder}
        labelPlacement="outside"
        items={parameters()}
        selectedKeys={[selectedKey]}
        disabledKeys={disabledKeys}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onSelectionChange(e.target.value);
        }}
        isDisabled={isDisabled}
      >
        {(parameter) => (
          <SelectItem key={parameter.key}>{parameter.label}</SelectItem>
        )}
      </Select>
    </CustomSkeleton>
  );
}
