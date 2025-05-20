interface FilterOptionsProps {
  selectedFilters: string[];
  onOptionClick: (status: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  selectedFilters,
  onOptionClick,
}) => {
  const statuses = ["paid", "pending", "draft"];

  return (
    <div className="absolute top-12 left-0 bg-[#252945] p-4 rounded-lg space-y-2 shadow-lg z-10">
      {statuses.map((status) => (
        <label key={status} className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            value={status}
            checked={selectedFilters.includes(status)}
            onChange={() => onOptionClick(status)}
          />
          <span className="capitalize">{status}</span>
        </label>
      ))}
    </div>
  );
};

export default FilterOptions;
