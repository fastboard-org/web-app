import { useQuery } from "@tanstack/react-query";
import { Query } from "@/types/connections";
import { executeQuery } from "@/lib/adapter.service";

const useData = (query: Query | null) => {
  console.log(query);
  const {
    isPending: loading,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ["get_data", query?.id],
    queryFn: () => fetchData(query),
    refetchOnWindowFocus: false,
  });

  const fetchData = async (query: Query | null) => {
    try {
      const response = await executeQuery(query);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    data,
    loading,
    isError,
    error,
  };
};

export default useData;
