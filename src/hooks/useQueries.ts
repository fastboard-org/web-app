import { Query } from "@/types/connections";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";

const useQueries = (connectionId: string) => {
  const {
    isPending: loading,
    data: queries,
    error,
    isError,
  } = useQuery({
    queryKey: ["queries", connectionId],
    queryFn: () => connectionsService.getQueriesByConnectionId(connectionId),
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const updateQuery = (queryIndex: number, updatedQuery: Query | null) => {
    if (!updatedQuery) {
      const updatedQueries = queries.filter(
        (_: Query, index: number) => index !== queryIndex
      );

      queryClient.setQueryData(["queries", connectionId], updatedQueries);
    } else {
      const updatedQueries = [...queries];
      updatedQueries[queryIndex] = updatedQuery;
      queryClient.setQueryData(["queries", connectionId], updatedQueries);
    }
  };

  return {
    queries: queries || [],
    loading,
    isError,
    error,
    updateQuery,
  };
};

export default useQueries;
