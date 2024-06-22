import { Dashboard } from "@/types/dashboards";
import { useEffect, useMemo, useState } from "react";

interface Column {
  key: string;
  label: string;
}

const usePaginatedData = (url: string, field: string, rowsPerPage: number) => {
  const [keys, setKeys] = useState<Column[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const fetchData = async () => {
    //TODO fetch data from connections
    try {
      const response = await fetch(url);
      let data = (await response.json())[field];
      setKeys(
        Object.keys(data[0]).map((key) => {
          return { key: key, label: key };
        })
      );

      data = data.map((item: any, index: number) => {
        return { key: index, ...item };
      });

      setData(data);

      //set loading to false after 3 seconds
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    fetchData();
  }, [mounted]);

  const [page, setPage] = useState(1);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const pages = Math.ceil(data.length / rowsPerPage);

  return { keys, items, isLoading, error, page, setPage, pages };
};

export default usePaginatedData;
