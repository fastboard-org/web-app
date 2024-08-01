"use client";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import useDashboard from "@/hooks/useDashboard";
import { useParams } from "next/navigation";

export default function DashboardName() {
  const { id } = useParams();
  const { dashboard, updateDashboard } = useDashboard(id as string);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(dashboard?.name);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="relative">
      {isEditing ? (
        <Input
          value={dashboard?.name}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          autoFocus
          onValueChange={(value) => {
            setName(value);
            updateDashboard((previous) => ({
              ...previous,
              name: value,
            }));
          }}
          classNames={{
            input: ["text-xl"],
            inputWrapper: ["rounded-lg"],
          }}
        />
      ) : (
        <h1
          onClick={handleDoubleClick}
          onDoubleClick={handleDoubleClick}
          className="text-xl cursor-pointer border-transparent hover:border-primary hover:border-2 rounded-lg px-2 py-1"
        >
          {dashboard?.name}
        </h1>
      )}
    </div>
  );
}
