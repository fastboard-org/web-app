import { Query } from "@/types/connections";
import { QueryKey, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/app/providers";
import { executeQuery } from "@/lib/adapter.service";

export const executeQueryFn = async (query: Query | null) => {
  try {
    if (!query) {
      return;
    }
    const response = await axiosInstance.post(`/execute/${query.id}`, {
      ...query.metadata,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useExecuteQuery = (invalidateQueries?: QueryKey[]) => {
  const {
    mutate: execute,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (query: Query | null) => executeQuery(query),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invalidateQueries,
      });
    },
  });

  return {
    execute,
    data,
    isSuccess,
    isPending,
    isError,
    error,
  };
};

export default useExecuteQuery;
