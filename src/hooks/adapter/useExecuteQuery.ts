import { Query } from "@/types/connections";
import {
  InvalidateQueryFilters,
  QueryKey,
  useMutation,
} from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { queryClient } from "@/app/providers";
import { adapterService } from "@/lib/services/adapter";
import { useState } from "react";

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

const useExecuteQuery = ({
  onSuccess,
}: {
  onSuccess?: (response: any) => void;
}) => {
  const [invalidateQueries, setInvalidateQueries] =
    useState<InvalidateQueryFilters>();
  const {
    mutate: execute,
    reset,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({
      query,
      parameters,
      invalidateQueries,
    }: {
      query: Query | null;
      parameters: Record<string, any>;
      invalidateQueries?: InvalidateQueryFilters;
    }) => {
      setInvalidateQueries(invalidateQueries);
      return adapterService.executeQuery(query, parameters);
    },
    onSuccess: () => {
      if (!invalidateQueries) return;
      queryClient.invalidateQueries(invalidateQueries);
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  return {
    execute,
    reset,
    data,
    isSuccess,
    isPending,
    isError,
    error,
  };
};

export default useExecuteQuery;
