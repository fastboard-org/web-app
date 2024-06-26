"use client";
import { useParams, useRouter } from "next/navigation";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import useConnection from "@/hooks/useConnection";
import { useEffect } from "react";
import ConnectionVariables from "@/components/connections/edit/ConnectionVariables";
import ConnectionCredentials from "@/components/connections/edit/ConnectionCredentials";
import ConnectionTitle from "@/components/connections/edit/ConnectionTitle";

export default function Connections() {
  const { id } = useParams();
  const router = useRouter();
  const {
    connection,
    loading,
    editConnectionName,
    editConnectionCredentials,
    editConnectionVariables,
  } = useConnection(id as string);
  useEffect(() => {
    if (!loading && !connection) {
      router.push("/home/connections");
    }
  }, [loading, connection]);

  const onCredentialsSave = (credentials: any) => {
    editConnectionCredentials(credentials);
  };

  const onVariablesSave = (variables: any) => {
    editConnectionVariables(variables);
  };

  const onNameSave = (name: string) => {
    editConnectionName(name);
  };

  return (
    <section className={"w-full h-full"}>
      <ConnectionTitle
        title={connection?.name || ""}
        loading={loading}
        onSave={onNameSave}
      />
      <CustomSkeleton
        className={"w-full h-[80%] mt-[35px] rounded-lg"}
        isLoaded={!loading}
      >
        <div className={"w-full h-full"}>
          <ConnectionCredentials
            credentials={connection?.credentials}
            onSave={onCredentialsSave}
          />
          <ConnectionVariables
            variables={connection?.variables || {}}
            onSave={onVariablesSave}
          />
        </div>
      </CustomSkeleton>
    </section>
  );
}
