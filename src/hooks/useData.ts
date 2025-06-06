import { useQuery } from "@tanstack/react-query";
import { ContentType, QueryData } from "@/types/connections";
import { adapterService } from "@/lib/services/adapter";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  previewAccessTokenState,
  previewRefreshTokenState,
} from "@/atoms/editor";
import { useParams } from "next/navigation";
import useDashboard from "@/hooks/dashboards/useDashboard";
import { isPublishPage } from "@/lib/helpers";
import { DashboardAuth } from "@/types/editor";

const useData = (componentId: string, queryData: QueryData | null) => {
  const { queryId, connectionId } = queryData || {};
  const { id: dashboardId } = useParams();
  const previewAccessToken = useRecoilValue(previewAccessTokenState);
  const previewRefreshToken = useRecoilValue(previewRefreshTokenState);

  const { dashboard } = useDashboard(isPublishPage() ? "published" : "editor");

  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["get_data", connectionId, { queryId, componentId }],
    queryFn: () => fetchData(queryData),
    refetchOnWindowFocus: false,
  });
  const [keys, setKeys] = useState<string[]>([]);

  const mapItem = (item: any) => {
    Object.keys(item).forEach((key) => {
      if (Array.isArray(item[key])) {
        item[key] = "array";
      } else if (typeof item[key] === "object") {
        item[key] = "object";
      } else if (typeof item[key] === "boolean") {
        item[key] = item[key] ? "true" : "false";
      }
    });
  };

  const fetchData = async (queryData: QueryData | null) => {
    const { queryId, contentType } = queryData || {};

    try {
      const response = await adapterService.executeQuery(
        queryId ?? null,
        dashboardId as string,
        {},
        previewAccessToken,
        {
          headers: {
            "Content-Type": contentType || ContentType.JSON,
          },
        },
        previewRefreshToken,
        dashboard?.metadata?.auth as DashboardAuth | undefined,
      );
      let responseData = response?.body;

      if (!responseData) {
        setKeys([]);
        return [];
      }

      if (Array.isArray(responseData) && responseData.length === 0) {
        setKeys([]);
        return [];
      }

      //This is a temporary fix to handle different data types
      if (typeof responseData === "object" && !Array.isArray(responseData)) {
        responseData = [responseData];
      }
      setKeys(Object.keys(responseData[0]));
      const finalData: any[] = responseData.map((item: any, index: number) => {
        mapItem(item);
        return { key: index, ...item };
      });
      return finalData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    data: data || [],
    fulldata: data || [],
    keys,
    refetch,
    isLoading,
    isFetching,
    isError,
    error,
  };
};

export default useData;
