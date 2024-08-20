import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({
  options,
}: {
  options: { value: string; label: string }[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
};

export default SortBy;
