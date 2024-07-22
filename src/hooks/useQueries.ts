import { Query } from "@/types/connections";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const useQueries = (connectionId: string) => {
  const {
    isPending: loading,
    isError,
    data: queries,
    error,
  } = useQuery({
    queryKey: ["queries"],
    queryFn: () => fetchQueries(),
    refetchOnWindowFocus: false,
  });

  const fetchQueries = async () => {
    try {
      const response = await axiosInstance.get(`/queries/me`);
      const data: Query[] = response.data.map((query: any) => {
        return {
          id: query._id,
          name: query.name,
          connection_id: query.connection_id,
          connection_type: query.connection_type,
          metadata: query.metadata,
        };
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateQuery = (queryIndex: number, updatedQuery: Query) => {
    /*
    const updatedQueries = [...queries];
    updatedQueries[queryIndex] = updatedQuery;
    setQueries(updatedQueries);*/
  };

  return {
    queries,
    loading,
    updateQuery,
    isError,
    error,
  };
};

export default useQueries;
