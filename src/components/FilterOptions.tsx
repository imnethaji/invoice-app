import { motion } from "framer-motion";

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
    <motion.div
      key={"filterOptionDiv"}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.2 }}
      className="absolute top-12 w-40 left-0 bg-[#252945] p-4 rounded-lg space-y-2 shadow-lg z-10"
    >
      {statuses.map((status) => (
        <div
          className="flex items-center space-x-2"
          onClick={() => {
            onOptionClick(status);
          }}
        >
          <label
            key={status}
            className="flex items-center text-white space-x-2"
            style={{ pointerEvents: "auto" }}
          >
            <input
              id={`checkbox-${status}`}
              type="checkbox"
              value={status}
              checked={selectedFilters.includes(status)}
              className="accent-[#7C5DFA] bg-[#1E2139] border-2 border-solid border-[#7C5DFA]"
            />
          </label>
          <span className="capitalize">{status}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default FilterOptions;
