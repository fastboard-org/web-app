import { useQuery } from "@tanstack/react-query";
import { Query } from "@/types/connections";
import { adapterService } from "@/lib/services/adapter";
import { useMemo, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";

const useData = (
  componentId: string,
  query: Query | null,
  rowsPerPage: number,
  sort?: SortDescriptor
) => {
  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [
      "get_data",
      query?.connection_id,
      { queryId: query?.id, componentId },
    ],
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
      const response = await adapterService.executeQuery(query);
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

  function sortData(
    data: any[] | undefined,
    descriptor: SortDescriptor | undefined
  ): any[] {
    if (!data) return [];
    const { column, direction } = descriptor || {};

    if (!column || !direction) return data;

    const sortedData = data.sort((a, b) => {
      let first = a[column];
      let second = b[column];
      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
    return sortedData;
  }

  const sortedData = useMemo(() => {
    console.log("Sorting", sort);
    return sortData(data, sort);
  }, [data, sort]);
  const items = useMemo(() => {
    console.log("Paging", page, rowsPerPage);
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedData?.slice(start, end);
  }, [page, sortedData, rowsPerPage, sort]);

  const pages = useMemo(() => {
    const pages = data ? Math.ceil(data.length / rowsPerPage) : 0;
    if (page > pages) {
      setPage(1);
    }
    return pages;
  }, [data, rowsPerPage]);

  return {
    data: items || [],
    fulldata: sortedData || [],
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
