import { useEffect, useState } from "react";
import { Query } from "@/types/connections";

const mockQueries: Query[] = [
  {
    id: "1",
    name: "Users",
    connection_id: "1",
    metadata: {
      method: "GET",
    },
  },
  {
    id: "2",
    name: "Products",
    connection_id: "1",
    metadata: {
      method: "POST",
    },
  },
  {
    id: "3",
    name: "Orders",
    connection_id: "1",
    metadata: {
      method: "GET",
    },
  },
  {
    id: "4",
    name: "Categories",
    connection_id: "1",
    metadata: {
      method: "GET",
    },
  },
  {
    id: "5",
    name: "Customers",
    connection_id: "1",
    metadata: {
      method: "PUT",
    },
  },
];

const useQueries = (connectionId: string) => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  const fetchQueries = async () => {
    // TODO: fetch connection by id
    setTimeout(() => {
      setQueries(mockQueries.filter((q) => q.connection_id === connectionId));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!mounted) {
      return setMounted(true);
    }

    fetchQueries();
  }, [connectionId]);

  const updateQuery = (queryIndex: number, updatedQuery: Query) => {
    const updatedQueries = [...queries];
    updatedQueries[queryIndex] = updatedQuery;
    setQueries(updatedQueries);
  };

  return {
    queries,
    loading,
    updateQuery,
  };
};

export default useQueries;
