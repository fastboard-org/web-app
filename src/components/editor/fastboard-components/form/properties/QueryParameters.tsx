import { Query } from "@/types/connections";
import FormDefaultValueKeySelection from "./FormDefaultValueKeySelection";
import useGetQuery from "@/hooks/connections/useGetQuery";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { Spacer } from "@nextui-org/react";

export default function QueryParameters({
  queryId,
  queryParameters,
  initialData,
  disabledParameters,
  onValueChange,
}: {
  queryId: string | null;
  queryParameters: Record<string, string>;
  initialData: any;
  disabledParameters: string[];
  onValueChange: (newQueryParameters: Record<string, string>) => void;
}) {
  const { query, loading } = useGetQuery(queryId);

  return (
    <CustomSkeleton
      isLoaded={!loading}
      onlyRenderOnLoad
      loadingClassName="h-10 w-full rounded-lg"
    >
      <div className="flex flex-col gap-2 px-2 w-full">
        {query.metadata?.parameters?.map((parameter: any, index: number) => {
          if (disabledParameters.includes(parameter.name)) {
            return null;
          }
          return (
            <div
              key={`query-parameter-${index}`}
              className="flex flex-row justify-between items-center"
            >
              <span className="text-small">{parameter.name}</span>
              <div className="w-1/2">
                <FormDefaultValueKeySelection
                  showLabel={false}
                  selectedKey={queryParameters[parameter.name]}
                  initialData={initialData}
                  onSelectionChange={(key) => {
                    onValueChange({
                      ...queryParameters,
                      [parameter.name]: key,
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </CustomSkeleton>
  );
}
