import { useQuery } from "@tanstack/react-query";
import { Query } from "@/types/connections";
import { executeQuery } from "@/lib/adapter.service";
import { useState } from "react";

const mapItem = (item: any) => {
  Object.keys(item).forEach((key) => {
    if (Array.isArray(item[key])) {
      item[key] = "array";
    } else {
      typeof item[key] === "object"
        ? (item[key] = "object")
        : (item[key] = item[key]);
    }
  });
};

const useData = (query: Query | null) => {
  const {
    isPending: loading,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ["get_data", query?.id],
    queryFn: () => fetchData(query),
    refetchOnWindowFocus: false,
  });
  const [keys, setKeys] = useState<string[]>([]);

  const fetchData = async (query: Query | null) => {
    try {
      const response = await executeQuery(query);
      let responseData = response?.data;
      if (!responseData) {
        return;
      }
      //TODO: this is a temporary fix to handle different data types
      if (typeof responseData === "object" && !Array.isArray(responseData)) {
        responseData = [responseData];
      }
      setKeys(Object.keys(responseData[0]));

      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    data,
    keys,
    loading,
    isError,
    error,
  };
};

export default useData;
