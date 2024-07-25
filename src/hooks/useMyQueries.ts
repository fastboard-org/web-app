import { useQuery } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";

const useMyQueries = (connectionId: string) => {
  const {
    isPending: loading,
    isError,
    data: queries,
    error,
  } = useQuery({
    queryKey: ["queries"],
    queryFn: () => connectionsService.getMyQueries(),
    refetchOnWindowFocus: false,
  });

  return {
    queries,
    loading,
    isError,
    error,
  };
};

export default useMyQueries;
