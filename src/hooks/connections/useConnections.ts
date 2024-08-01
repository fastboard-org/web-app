import { Connection, ConnectionType } from "@/types/connections";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";

const useConnections = () => {
  const {
    isPending: loading,
    data: connections,
    error,
    isError,
  } = useQuery({
    queryKey: ["connections"],
    queryFn: () => connectionsService.getConnections(),
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const addConnection = (connection: Connection) => {
    const updatedConnections = [...(connections as Connection[]), connection];
    queryClient.setQueryData(["connections"], updatedConnections);
  };

  const deleteConnection = (connectionId: string) => {
    const updatedConnections = (connections as Connection[]).filter(
      (connection) => connection.id !== connectionId,
    );
    queryClient.setQueryData(["connections"], updatedConnections);
  };

  return {
    connections: connections || [],
    loading,
    isError,
    error,
    operations: {
      addConnection,
      deleteConnection,
    },
  };
};

export default useConnections;
