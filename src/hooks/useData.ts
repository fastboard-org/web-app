import { useQuery } from "@tanstack/react-query";
import { QueryData } from "@/types/connections";
import { adapterService } from "@/lib/services/adapter";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { previewAccessTokenState } from "@/atoms/editor";
import { useParams } from "next/navigation";

const useData = (
  componentId: string,
  queryData: QueryData | null,
  rowsPerPage: number,
) => {
  const { queryId, connectionId } = queryData || {};
  const { id: dashboardId } = useParams();
  const previewAccessToken = useRecoilValue(previewAccessTokenState);
  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["get_data", connectionId, { queryId, componentId }],
    queryFn: () => fetchData(queryId || ""),
    refetchOnWindowFocus: false,
  });
  const [keys, setKeys] = useState<string[]>([]);
  const [page, setPage] = useState(1);

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

  const fetchData = async (queryId: string | null) => {
    try {
      const response = await adapterService.executeQuery(
        queryId,
        dashboardId as string,
        {},
        previewAccessToken,
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

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data?.slice(start, end);
  }, [page, data, rowsPerPage]);

  const pages = useMemo(() => {
    const pages = data ? Math.ceil(data.length / rowsPerPage) : 0;
    if (page > pages) {
      setPage(1);
    }
    return pages;
  }, [data, rowsPerPage]);

  return {
    data: items || [],
    fulldata: data || [],
    keys,
    page,
    setPage,
    pages,
    refetch,
    isLoading,
    isFetching,
    isError,
    error,
  };
};

export default useData;
