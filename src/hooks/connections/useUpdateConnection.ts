import { useMutation } from "@tanstack/react-query";
import { connectionsService } from "@/lib/services/connections";
import { Connection } from "@/types/connections";

export const useUpdateConnection = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (connection: Connection) => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: updateConnection, isPending } = useMutation({
    mutationFn: ({
      id,
      name,
      credentials,
      variables,
    }: {
      id: string;
      name: string;
      credentials: any;
      variables: any;
    }) => connectionsService.updateConnection(id, name, credentials, variables),
    onSuccess,
    onError,
  });

  return {
    updateConnection,
    loading: isPending,
  };
};
