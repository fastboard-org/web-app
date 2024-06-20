import { useEffect, useState } from "react";
import { Connection, ConnectionType } from "@/types/connections";

const mockConnections: Connection[] = [
  {
    id: "1",
    name: "PokeApi",
    type: ConnectionType.REST,
    credentials: {
      url: "https://jsonplaceholder.typicode.com/",
    },
    variables: {
      posts_endpoint: "posts",
    },
  },
  {
    id: "2",
    name: "NotificationsDB",
    type: ConnectionType.MONGO,
    credentials: {
      connection_uri: "mongodb://localhost:27017/",
    },
    variables: {
      users_collection: "users",
    },
  },
  {
    id: "3",
    name: "Users Database",
    type: ConnectionType.SQL,
    credentials: {
      connection_uri: "postgresql://localhost:5432/",
      username: "admin",
      password: "password",
    },
    variables: {
      users_table: "users",
    },
  },
];

const useConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  const fetchConnections = async () => {
    //TODO fetch connections from API
    setTimeout(() => {
      setConnections(mockConnections);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }

    fetchConnections();
  }, [mounted]);

  return { connections, loading };
};

export default useConnections;
