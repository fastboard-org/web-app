import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";

const EditableTitle = ({
  value,
  onChange,
  titleClassName,
  inputClassName,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  titleClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      onChange(inputValue);
    }
  };

  return isEditing || !value ? (
    <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        setIsEditing(false);
        onChange(inputValue);
      }}
      autoFocus
      className={inputClassName}
      placeholder={placeholder}
    />
  ) : (
    <h3 onClick={() => setIsEditing(true)} className={titleClassName}>
      {value}
    </h3>
  );
};

export default EditableTitle;
