"use client";
import { useParams, useRouter } from "next/navigation";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import useConnection from "@/hooks/useConnection";
import { useEffect, useState } from "react";
import ConnectionTitle from "@/components/connections/edit/ConnectionTitle";
import ConnectionSettingsModal from "@/components/connections/edit/ConnectionSettingsModal";
import { useDisclosure } from "@nextui-org/react";
import { Connection } from "@/types/connections";

export default function Connections() {
  const { id } = useParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { connection, loading, updateConnection } = useConnection(id as string);

  useEffect(() => {
    if (!loading && !connection) {
      router.push("/home/connections");
    }
  }, [loading, connection]);

  const handleSubmit = (connection: Connection) => {
    updateConnection(connection);
  };

  return (
    <section className={"w-full h-full max-w-[1400px]"}>
      <ConnectionTitle
        title={connection?.name || ""}
        loading={loading}
        onButtonClick={onOpen}
      />
      <CustomSkeleton
        className={"w-full h-[80%] mt-[35px] rounded-lg"}
        isLoaded={!loading}
      >
        <div></div>
      </CustomSkeleton>
      <ConnectionSettingsModal
        isOpen={isOpen}
        connection={connection as Connection}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </section>
  );
}
