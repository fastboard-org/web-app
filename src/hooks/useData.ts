import { Dashboard } from "@/types/dashboards";
import { useEffect, useState } from "react";

interface Column {
  key: string;
  label: string;
}

const useData = (url: string) => {
  const [keys, setKeys] = useState<Column[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  const fetchData = async () => {
    //TODO fetch data from connections

    const response = await fetch(url);
    let data = (await response.json())["results"];
    setKeys(
      Object.keys(data[0]).map((key) => {
        return { key: key, label: key };
      })
    );

    data = data.map((item: any, index: number) => {
      return { key: index, ...item };
    });

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    fetchData();
  }, [mounted]);

  return { keys, data, isLoading };
};

export default useData;
