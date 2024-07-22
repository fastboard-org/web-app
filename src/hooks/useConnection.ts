import { Connection } from "@/types/connections";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";

const useConnection = (id: string) => {
  const {
    isPending: loading,
    data: connection,
    error,
    isError,
  } = useQuery({
    queryKey: ["connection", id],
    queryFn: () => connectionsService.getConnection(id),
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const updateConnection = (updatedConnection: Connection) => {
    queryClient.setQueryData(["connection", id], updatedConnection);
  };

  return {
    connection: connection as Connection,
    loading,
    error,
    isError,
    updateConnection,
  };
};

export default useConnection;
