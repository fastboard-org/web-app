import { useMutation } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";
import { Connection, ConnectionType } from "@/types/connections";

export const useCreateConnection = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (connection: Connection) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: createConnection, isPending } = useMutation({
    mutationFn: ({
      name,
      type,
      credentials,
    }: {
      name: string;
      type: ConnectionType;
      credentials: any;
    }) => connectionsService.createConnection(name, type, credentials),
    onSuccess,
    onError,
  });

  return {
    createConnection,
    loading: isPending,
  };
};
