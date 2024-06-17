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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="relative">
      {isEditing ? (
        <Input
          value={name}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          autoFocus
          classNames={{
            input: ["text-2xl"],
          }}
        />
      ) : (
        <h1
          onClick={handleDoubleClick}
          onDoubleClick={handleDoubleClick}
          className="text-2xl cursor-pointer border-transparent hover:border-primary hover:border-2 rounded-2xl px-2 py-1"
        >
          {name}
        </h1>
      )}
    </div>
  );
}
