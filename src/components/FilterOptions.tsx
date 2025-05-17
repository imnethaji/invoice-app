interface FilterOptionsProps {
  onOptionClick: (status: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onOptionClick }) => {
  const handleOptionClick = (e: React.MouseEvent, status: string) => {
    e.stopPropagation();
    onOptionClick(status);
  };

  return (
    <div
      className="filterOptions absolute top-12 -left-6 w-44 bg-invoiceTab p-4 rounded-xl space-y-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="draftFilter flex space-x-3 w-[80%] "
        onClick={(e) => handleOptionClick(e, "draft")}
      >
        <input
          type="checkbox"
          name="draft"
          id="draftFilterInput"
          onClick={(e) => e.stopPropagation()}
        />
        <label
          className="hover:cursor-pointer w-full"
          htmlFor="draftFilterInput"
        >
          Draft
        </label>
      </div>

      <div
        className="draftFilter flex space-x-3 w-[80%]"
        onClick={(e) => handleOptionClick(e, "pending")}
      >
        <input
          type="checkbox"
          name="pending"
          id="pendingFilterInput"
          onClick={(e) => e.stopPropagation()}
        />
        <label
          className="hover:cursor-pointer w-full"
          htmlFor="pendingFilterInput"
        >
          Pending
        </label>
      </div>

      <div
        className="draftFilter flex space-x-3 w-[80%]"
        onClick={(e) => handleOptionClick(e, "paid")}
      >
        <input
          type="checkbox"
          name="paid"
          id="paidFilterInput"
          onClick={(e) => e.stopPropagation()}
        />
        <label
          className="hover:cursor-pointer w-full"
          htmlFor="paidFilterInput"
        >
          Paid
        </label>
      </div>
    </div>
  );
};

export default FilterOptions;
