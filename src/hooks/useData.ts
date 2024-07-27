import { useQuery } from "@tanstack/react-query";
import { Query } from "@/types/connections";
import { executeQuery } from "@/lib/services/adapter";
import { useMemo, useState } from "react";

const useData = (
  componentId: string,
  query: Query | null,
  rowsPerPage: number
) => {
  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["get_data", query?.id, { componentId: componentId }],
    queryFn: () => fetchData(query),
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

  const fetchData = async (query: Query | null) => {
    try {
      const response = await executeQuery(query);
      let responseData = response?.body;
      if (!responseData) {
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
  }, [page, data]);

  const pages = data ? Math.ceil(data.length / rowsPerPage) : 0;

  return {
    data: items || [],
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
