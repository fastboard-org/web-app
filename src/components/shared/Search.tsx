import { CiSearch } from "react-icons/ci";
import { Input } from "@nextui-org/react";

interface SearchProps {
  search: string;
  onChange: (e: { target: { value: string } }) => void;
  onClear: () => void;
}

const Search = ({ search, onChange, onClear }: SearchProps) => {
  return (
    <Input
      className={"w-[450px] bg-opacity-5"}
      isClearable
      startContent={<CiSearch className={"text-primary"} size={25} />}
      placeholder={"Search"}
      size={"lg"}
      onChange={onChange}
      onClear={onClear}
      value={search}
    />
  );
};

export default Search;
