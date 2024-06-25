import { useEffect, useState } from "react";
import { Connection } from "@/types/connections";
import { mockConnections } from "@/hooks/useConnections";

const useConnection = (id: string) => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  const fetchConnection = async () => {
    // TODO: fetch connection by id
    setTimeout(() => {
      setConnection(mockConnections.find((c) => c.id === id) || null);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    fetchConnection();
  }, [id]);

  const editConnectionName = (name: string) => {
    setConnection((prev) => {
      if (prev) {
        return { ...prev, name };
      }
      return null;
    });
  };

  return { connection, loading, editConnectionName };
};

export default useConnection;
