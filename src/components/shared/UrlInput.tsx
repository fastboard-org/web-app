import { Input } from "@nextui-org/react";

const HTTPS_PREFIX = "https://";

const UrlInput = ({
  value,
  onChange,
  showHttps = true,
  label = "Main URL",
  placeholder = "api.example.com",
}: {
  value: string;
  onChange: (newValue: string) => void;
  showHttps?: boolean;
  label?: string;
  placeholder?: string;
}) => {
  const valueToShow =
    showHttps && value.startsWith(HTTPS_PREFIX)
      ? value.split(HTTPS_PREFIX)[1]
      : value;

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
        if (showHttps && newValue.startsWith(HTTPS_PREFIX)) {
          onChange(newValue.split(HTTPS_PREFIX)[1]);
        } else {
          onChange(newValue);
        }
      }}
      startContent={
        showHttps ? (
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">{HTTPS_PREFIX}</span>
          </div>
        ) : null
      }
    />
  );
};

export default UrlInput;
