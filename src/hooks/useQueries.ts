import { Query } from "@/types/connections";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";

const mockQueries: Query[] = [
  {
    id: "1",
    name: "Pokemons",
    connection_id: "1",
    metadata: {
      method: "GET",
      path: "/pokemon",
    },
  },
  {
    id: "2",
    name: "Products",
    connection_id: "1",
    metadata: {
      method: "POST",
    },
  },
  {
    id: "3",
    name: "Orders",
    connection_id: "1",
    metadata: {
      method: "GET",
    },
  },
  {
    id: "4",
    name: "Categories",
    connection_id: "1",
    metadata: {
      method: "GET",
    },
  },
  {
    id: "5",
    name: "Customers",
    connection_id: "1",
    metadata: {
      method: "PUT",
    },
  },
];

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
        (_: Query, index: number) => index !== queryIndex,
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
