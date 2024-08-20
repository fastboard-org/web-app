import { Query } from "@/types/connections";
import { useQuery } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";

const useGetQuery = (id: string | null) => {
  const {
    isPending: loading,
    data: query,
    error,
    isError,
  } = useQuery({
    queryKey: ["query", id],
    queryFn: () => {
      return id ? connectionsService.getQuery(id) : null;
    },
    refetchOnWindowFocus: false,
  });

  return {
    query: query as Query,
    loading,
    error,
    isError,
  };
};

export default useGetQuery;
