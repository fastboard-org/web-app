"use client";
import { useState } from "react";
import { Input } from "@nextui-org/react";

export default function DashboardName() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Dashboard name");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <Input
          value={name}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          autoFocus
          classNames={{
            input: ["text-4xl"],
          }}
        />
      ) : (
        <h1 onDoubleClick={handleDoubleClick} className="text-4xl">
          {name}
        </h1>
      )}
    </div>
  );
}
