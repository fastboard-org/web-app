import { Input } from "@nextui-org/react";

const UrlInput = ({
  value,
  onChange,
  label = "Main URL",
  placeholder = "api.example.com",
  prefix = "",
}: {
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  placeholder?: string;
  prefix?: string;
}) => {
  const valueToShow =
    prefix && value.startsWith(prefix) ? value.split(prefix)[1] : value;

  return (
    <Input
      size={"lg"}
      className={"w-full"}
      label={label}
      labelPlacement={"outside"}
      isRequired
      placeholder={placeholder}
      value={valueToShow}
      onChange={(e) => {
        const newValue = e.target.value;
        if (prefix && newValue.startsWith(prefix)) {
          onChange(newValue.split(prefix)[1]);
        } else {
          onChange(newValue);
        }
      }}
      startContent={
        prefix ? (
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">{prefix}</span>
          </div>
        ) : null
      }
    />
  );
};

export default UrlInput;
