import { Column } from "@/types/editor/table-types";
import { useEffect, useMemo, useState } from "react";

const usePaginatedData = (rowsPerPage: number) => {
  const [query, setQuery] = useState<{ url: string; field: string | null }>({
    url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    field: "results",
  });
  const [keys, setKeys] = useState<Column[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [page, setPage] = useState(1);

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

  const fetchData = async () => {
    //TODO fetch data from connections
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(query.url);
      let data = null;
      if (query.field === null) {
        data = await response.json();
      } else {
        data = (await response.json())[query.field];
      }

      //TODO: this is a temporary fix to handle different data types
      if (typeof data === "object" && !Array.isArray(data)) {
        data = [data];
      }
      setKeys(
        Object.keys(data[0]).map((key) => {
          return { key: key, label: key };
        })
      );

      data = data.map((item: any, index: number) => {
        mapItem(item);
        return { key: index, ...item };
      });

      setData(data);
      //set loading to false after 3 seconds
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    fetchData();
  }, [mounted, query]);

  const updateQuery = (url: string, field: string | null) => {
    if (url !== query.url || field !== query.field) {
      setQuery({ url: url, field: field });
      setPage(1); // Reset page to 1 when query changes
    }
  };

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const pages = Math.ceil(data.length / rowsPerPage);

  return { keys, items, isLoading, error, page, setPage, pages, updateQuery };
};

export default usePaginatedData;
