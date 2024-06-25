"use client";
import useConnections from "@/hooks/useConnections";
import ViewConnections from "@/components/connections/view/ViewConnections";
import { Connection } from "@/types/connections";
import { useRouter } from "next/navigation";

export default function Connections() {
  const { connections, loading } = useConnections();
  const router = useRouter();

  const handleConnectionClick = (connection: Connection) => {
    setTimeout(() => {
      router.push(`/home/connections/${connection.id}`);
    }, 250);
  };

  return (
    <ViewConnections
      connections={connections}
      loading={loading}
      onConnectionClick={handleConnectionClick}
    />
  );
}
