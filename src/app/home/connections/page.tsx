"use client";
import useConnections from "@/hooks/useConnections";
import ViewConnections from "@/components/connections/view/ViewConnections";
import { Connection } from "@/types/connections";

export default function Connections() {
  const { connections, loading } = useConnections();

  const handleConnectionClick = (connection: Connection) => {};

  return (
    <ViewConnections
      connections={connections}
      loading={loading}
      onConnectionClick={handleConnectionClick}
    />
  );
}
