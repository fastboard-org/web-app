import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function DebounceInput({
  value,
  onValueChange,
  delay = 500,
  className,
  type,
}: {
  value: string;
  onValueChange: (value: string) => void;
  delay?: number;
  className?: string;
  type?: string;
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onValueChange(inputValue);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [inputValue, delay]);

  return (
    <Input
      type={type}
      className={className}
      value={inputValue}
      onValueChange={(value) => {
        setInputValue(value);
      }}
      width={"100%"}
    />
  );
}
