"use client";
import ViewConnections from "@/components/connections/view/ViewConnections";
import { Connection } from "@/types/connections";
import { useRouter } from "next/navigation";

export default function Connections() {
  const router = useRouter();

  const handleConnectionClick = (connection: Connection) => {
    router.push(`/home/connections/${connection.id}`);
  };

  return <ViewConnections onConnectionClick={handleConnectionClick} />;
}
