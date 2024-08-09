import { HTTP_METHOD, Query } from "@/types/connections";
import { InvalidateQueryFilters, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { adapterService } from "@/lib/services/adapter";
import { useState } from "react";

const useExecuteQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
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
    onSuccess: (data, variables) => {
      refreshData(variables.query);
      if (onSuccess) {
        onSuccess(data);
      }
      if (!invalidateQueries) return;
      queryClient.invalidateQueries(invalidateQueries);
    },
    onError,
  });

  const refreshData = (query: Query | null) => {
    if (!query) return;
    const updateMethods = [
      HTTP_METHOD.POST,
      HTTP_METHOD.PUT,
      HTTP_METHOD.PATCH,
      HTTP_METHOD.DELETE,
    ];
    if (query && updateMethods.includes(query.metadata.method)) {
      //Invalidate all querys that gets data from this connection
      queryClient.invalidateQueries({
        queryKey: ["get_data", query.connection_id],
      });
    }
  };

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
