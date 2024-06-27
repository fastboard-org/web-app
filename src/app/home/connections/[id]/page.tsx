"use client";
import { useParams, useRouter } from "next/navigation";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import useConnection from "@/hooks/useConnection";
import { useEffect, useState } from "react";
import ConnectionVariables from "@/components/connections/edit/ConnectionVariables";
import ConnectionCredentials from "@/components/connections/edit/ConnectionCredentials";
import ConnectionTitle from "@/components/connections/edit/ConnectionTitle";
import { Button } from "@nextui-org/react";

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

  const [saving, setSaving] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<any>({});
  const [variableEntries, setVariableEntries] = useState<any>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (!loading) {
      !connection && router.push("/home/connections");

      setCredentials(connection?.credentials);
      setVariableEntries(Object.entries(connection?.variables || {}));
      setName(connection?.name || "");
    }
  }, [loading, connection]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      editConnectionCredentials(credentials);
      editConnectionVariables(Object.fromEntries(variableEntries));
      editConnectionName(name);
      setSaving(false);
    }, 1000);
  };

  return (
    <section className={"w-full h-full max-w-[1400px]"}>
      <ConnectionTitle title={name} loading={loading} onChange={setName} />
      <CustomSkeleton
        className={"w-full h-[80%] mt-[35px] rounded-lg"}
        isLoaded={!loading}
      >
        <div className={"w-full h-full"}>
          <ConnectionCredentials
            credentials={credentials}
            onChange={setCredentials}
          />
          <ConnectionVariables
            entries={variableEntries}
            onChange={setVariableEntries}
          />
        </div>
      </CustomSkeleton>
    </section>
  );
}
