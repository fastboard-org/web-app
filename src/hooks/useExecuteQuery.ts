import { Query } from "@/types/connections";
import {
  InvalidateQueryFilters,
  QueryKey,
  useMutation,
} from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/app/providers";
import { executeQuery } from "@/lib/services/adapter";

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

const useExecuteQuery = (invalidateQueries?: InvalidateQueryFilters) => {
  const {
    mutate: execute,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({
      query,
      parameters,
    }: {
      query: Query | null;
      parameters: Record<string, any>;
    }) => executeQuery(query, parameters),
    onSuccess: () => {
      queryClient.invalidateQueries(invalidateQueries);
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
